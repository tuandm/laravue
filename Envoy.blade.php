@servers(['web' => ['dragon@cipherpols.com']])

@setup
    $now = new DateTime();
    $branch = isset($branch) ? $branch : 'master';
    $repository = 'git@gitlab.com:bacduong/laravue.git';
    $releases_dir = '/var/www/html/deploy/laravue/release';
    $app_dir = '/var/www/html/deploy/laravue/';
    $release = date('YmdHis');
    $new_release_dir = $releases_dir .'/'. $release;
@endsetup

@story('deploy')
    clone_repository
    run_composer
    update_symlinks
    run_deploy_scripts
@endstory

@task('clone_repository')
    echo 'Cloning repository'
    [ -d {{ $releases_dir }} ] || mkdir {{ $releases_dir }}
    git clone --depth 1 {{ $repository }} {{ $new_release_dir }}
    cd {{ $new_release_dir }}
    git reset --hard {{ $commit }}
@endtask

@task('run_composer')
    echo "Starting deployment ({{ $release }})"
    cd {{ $new_release_dir }}
    composer install --prefer-dist --no-scripts -q -o
@endtask

@task('run_deploy_scripts')
    echo 'Linking .env file'
    ln -nfs {{ $app_dir }}/.env {{ $new_release_dir }}/.env

    echo "Running deployment scripts"
    cd {{ $new_release_dir }}
    php artisan cache:clear
    php artisan config:clear
    php artisan view:clear
    php artisan storage:link
    php artisan migrate --force
    npm install
    npm run production
@endtask

@task('update_symlinks')
    echo "Linking storage directory"
    rm -rf {{ $new_release_dir }}/storage
    ln -nfs {{ $app_dir }}/storage {{ $new_release_dir }}/storage

    echo 'Linking current release'
    ln -nfs {{ $new_release_dir }} {{ $app_dir }}/current
@endtask

@servers(['web' => ['dragon@cipherpols.com']])

@setup
    $now = new DateTime();
    $branch = isset($branch) ? $branch : 'staging';
    $repository = 'git@github.com:tuandm/laravue.git';
    $releases_dir = '/var/www/html/deploy/laravue/release';
    $app_dir = '/var/www/html/deploy/laravue/';
    $release = $branch . '-' . date('YmdHis');
    $new_release_dir = $releases_dir .'/'. $release;
@endsetup

@story('deploy')
    clone_repository
    run_composer
    run_deploy_scripts
    update_symlinks
    delete_git_metadata
    clean_old_releases
@endstory

@task('clone_repository')
    echo 'Cloning repository'
    [ -d {{ $releases_dir }} ] || mkdir {{ $releases_dir }}
    git clone {{ $repository }} {{ $new_release_dir }}
    cd {{ $new_release_dir }}
    git checkout {{ $branch }}
@endtask

@task('run_composer')
    echo "Starting deployment ({{ $release }})"
    cd {{ $new_release_dir }}
    echo "Running composer..."
    composer install --prefer-dist --no-scripts -q -o
@endtask

@task('run_deploy_scripts')
    echo 'Linking .env file'
    ln -nfs {{ $app_dir }}/.env {{ $new_release_dir }}/.env

    echo 'Running deployment scripts'
    cd {{ $new_release_dir }}
    php artisan cache:clear
    php artisan config:clear
    php artisan view:clear
    php artisan storage:link
    php artisan migrate --force

    echo 'Running yarn...'
    yarn install
    yarn run production
@endtask

@task('delete_git_metadata')
    echo 'Delete .git folder'
    cd {{ $new_release_dir }}
    rm -rf .git
@endtask

@task('update_symlinks')
    echo 'Linking storage directory'
    rm -rf {{ $new_release_dir }}/storage
    ln -nfs {{ $app_dir }}/storage {{ $new_release_dir }}/storage

    echo 'Linking current release'
    ln -nfs {{ $new_release_dir }} {{ $app_dir }}/current
@endtask

@task('clean_old_releases')
    # This will list our releases by modification time and delete all but the 2 most recent.
    purging=$(ls -dt {{ $releases_dir }}/* | tail -n +3);

    if [ "$purging" != "" ]; then
        echo Purging old releases: $purging;
        rm -rf $purging;
    else
        echo 'No releases found for purging at this time';
    fi
@endtask

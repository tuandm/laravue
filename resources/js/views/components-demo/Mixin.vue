<template>
  <div class="mixin-components-container">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Buttons</span>
        </div>
        <div style="margin-bottom:50px;">
          <el-col :span="4" class="text-center">
            <router-link class="pan-btn blue-btn" to="/documentation/index">
              Documentation
            </router-link>
          </el-col>
          <el-col :span="4" class="text-center">
            <router-link class="pan-btn light-blue-btn" to="/icon/index">
              Icons
            </router-link>
          </el-col>
          <el-col :span="4" class="text-center">
            <router-link class="pan-btn pink-btn" to="/excel/export-excel">
              Excel
            </router-link>
          </el-col>
          <el-col :span="4" class="text-center">
            <router-link class="pan-btn green-btn" to="/table/complex-table">
              Table
            </router-link>
          </el-col>
          <el-col :span="4" class="text-center">
            <router-link class="pan-btn tiffany-btn" to="/example/create">
              Form
            </router-link>
          </el-col>
          <el-col :span="4" class="text-center">
            <router-link class="pan-btn yellow-btn" to="/theme/index">
              Theme
            </router-link>
          </el-col>
        </div>
      </el-card>
    </el-row>

    <el-row :gutter="20" style="margin-top:50px;">
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Material Design Input</span>
          </div>
          <div style="height:100px;">
            <el-form :model="demo" :rules="demoRules">
              <el-form-item prop="title">
                <md-input v-model="demo.title" icon="search" name="title" placeholder="Enter title">
                  Title
                </md-input>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Picture hover effect</span>
          </div>
          <div class="component-item">
            <pan-thumb width="100px" height="100px" image="https://eclectickoifish.files.wordpress.com/2015/01/7826_one_piece.jpg">
              laravue
            </pan-thumb>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Ripple wave v-directive</span>
          </div>
          <div class="component-item">
            <el-button v-waves type="primary">
              Water ripple effect
            </el-button>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Hover text</span>
          </div>
          <div class="component-item">
            <mallki class-name="mallki-text" text="Laravue Dashboard" />
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top:50px;">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Share</span>
          </div>
          <div class="component-item" style="height:420px;">
            <dropdown-menu :items="articleList" style="margin:0 auto;" title="Article list" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanThumb from '@/components/PanThumb';
import MdInput from '@/components/MDinput';
import Mallki from '@/components/TextHoverEffect/Mallki';
import DropdownMenu from '@/components/Share/DropdownMenu';
import waves from '@/directive/waves/index.js'; // v-wave directive

export default {
  name: 'ComponentMixinDemo',
  components: {
    PanThumb,
    MdInput,
    Mallki,
    DropdownMenu,
  },
  directives: {
    waves,
  },
  data() {
    const validate = (rule, value, callback) => {
      if (value.length !== 6) {
        callback(new Error('Please enter 6 chars'));
      } else {
        callback();
      }
    };
    return {
      demo: {
        title: '',
      },
      demoRules: {
        title: [{ required: true, trigger: 'change', validator: validate }],
      },
      articleList: [
        { title: 'Basic article', href: 'https://dev.to/tuandm/laravel--vuejs--laravue---a-beautiful-dashboard-for-laravel-3h11' },
        { title: 'Login permission', href: 'https://doc.laravue.dev/guide/essentials/permission.html' },
        { title: 'laravue-core', href: 'https://dev.to/tuandm/laravue-core---a-laravel-package-to-build-a-beautiful-dashboard-5aia' },
        { title: 'Github', href: 'https://github.com/tuandm/laravue' },
      ],
    };
  },
};
</script>

<style scoped>
.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}
.component-item{
  min-height: 100px;
}
</style>

<template>
  <el-card v-if="user.name">
    <div class="user-profile">
      <div :class="['user-avatar box-center', {'changeable': canChangeAvatar}]" @click="changeAvatar">
        <pan-thumb :image="user.avatar" :height="'100px'" :width="'100px'" :hoverable="false" />
      </div>
      <div class="box-center">
        <div class="user-name text-center">
          {{ user.name }}
        </div>
        <div class="user-role text-center text-muted">
          {{ getRole() }}
        </div>
      </div>
      <div class="box-social">
        <el-table :data="social" :show-header="false">
          <el-table-column prop="name" label="Name" />
          <el-table-column label="Count" align="left" width="100">
            <template slot-scope="scope">
              {{ scope.row.count | toThousandFilter }}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="user-follow">
        <el-button type="primary" style="width: 100%;">
          Follow
        </el-button>
      </div>
    </div>
    <image-cropper
      v-show="showImageCropper"
      :key="imageCropperKey"
      :width="300"
      :height="300"
      url="https://httpbin.org/post"
      lang-type="en"
      @close="closeImageCropper"
      @crop-upload-success="cropSuccess"
    />
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb';
import ImageCropper from '@/components/ImageCropper';

export default {
  components: { PanThumb, ImageCropper },
  props: {
    canChangeAvatar: {
      type: Boolean,
      default: () => false,
    },
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          avatar: '',
          roles: [],
        };
      },
    },
  },
  data() {
    return {
      social: [
        {
          'name': 'Followers',
          'count': 1235,
        },
        {
          'name': 'Following',
          'count': 23512,
        },
        {
          'name': 'Friends',
          'count': 7242,
        },
      ],
      showImageCropper: false,
      imageCropperKey: 0,
    };
  },
  methods: {
    getRole() {
      const roles = this.user.roles.map(value => this.$options.filters.uppercaseFirst(value));
      return roles.join(' | ');
    },
    changeAvatar() {
      this.showImageCropper = true;
    },
    closeImageCropper() {
      this.showImageCropper = false;
    },
    cropSuccess() {
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.user-profile {
  .user-name {
    font-weight: bold;
  }
  .box-center {
    padding-top: 10px;
    &.changeable {
      cursor: pointer;
    }
  }
  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }
  .box-social {
    padding-top: 30px;
    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }
  .user-follow {
    padding-top: 20px;
  }
}
</style>

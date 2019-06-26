<template>
  <div v-show="value" class="vue-image-crop-upload">
    <div class="vicp-wrap">
      <div class="vicp-close" @click="off">
        <i class="vicp-icon4" />
      </div>

      <div v-show="step == 1" class="vicp-step1">
        <div class="vicp-drop-area" @dragleave="preventDefault" @dragover="preventDefault" @dragenter="preventDefault" @click="handleClick" @drop="handleChange">
          <i v-show="loading != 1" class="vicp-icon1">
            <i class="vicp-icon1-arrow" />
            <i class="vicp-icon1-body" />
            <i class="vicp-icon1-bottom" />
          </i>
          <span v-show="loading !== 1" class="vicp-hint">{{ lang.hint }}</span>
          <span v-show="!isSupported" class="vicp-step-supported-hint">{{ lang.stepSupported }}</span>
          <input v-show="false" v-if="step == 1" ref="fileinput" type="file" @change="handleChange">
        </div>
        <div v-show="hasError" class="vicp-error">
          <i class="vicp-icon2" /> {{ errorMsg }}
        </div>
        <div class="vicp-operate">
          <a @click="off" @mousedown="ripple">{{ lang.btn.off }}</a>
        </div>
      </div>

      <div v-if="step == 2" class="vicp-step2">
        <div class="vicp-crop">
          <div v-show="true" class="vicp-crop-left">
            <div class="vicp-img-container">
              <img
                ref="img"
                :src="sourceImgUrl"
                :style="sourceImgStyle"
                class="vicp-img"
                draggable="false"
                @drag="preventDefault"
                @dragstart="preventDefault"
                @dragend="preventDefault"
                @dragleave="preventDefault"
                @dragover="preventDefault"
                @dragenter="preventDefault"
                @drop="preventDefault"
                @touchstart="imgStartMove"
                @touchmove="imgMove"
                @touchend="createImg"
                @touchcancel="createImg"
                @mousedown="imgStartMove"
                @mousemove="imgMove"
                @mouseup="createImg"
                @mouseout="createImg"
              >
              <div :style="sourceImgShadeStyle" class="vicp-img-shade vicp-img-shade-1" />
              <div :style="sourceImgShadeStyle" class="vicp-img-shade vicp-img-shade-2" />
            </div>

            <div class="vicp-range">
              <input :value="scale.range" type="range" step="1" min="0" max="100" @input="zoomChange">
              <i class="vicp-icon5" @mousedown="startZoomSub" @mouseout="endZoomSub" @mouseup="endZoomSub" />
              <i class="vicp-icon6" @mousedown="startZoomAdd" @mouseout="endZoomAdd" @mouseup="endZoomAdd" />
            </div>

            <div v-if="!stepRotate" class="vicp-rotate">
              <i @mousedown="startRotateLeft" @mouseout="endRotate" @mouseup="endRotate">↺</i>
              <i @mousedown="startRotateRight" @mouseout="endRotate" @mouseup="endRotate">↻</i>
            </div>
          </div>
          <div v-show="true" class="vicp-crop-right">
            <div class="vicp-preview">
              <div v-if="!stepSquare" class="vicp-preview-item">
                <img :src="createImgUrl" :style="previewStyle">
                <span>{{ lang.preview }}</span>
              </div>
              <div v-if="!stepCircle" class="vicp-preview-item vicp-preview-item-circle">
                <img :src="createImgUrl" :style="previewStyle">
                <span>{{ lang.preview }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="vicp-operate">
          <a @click="setStep(1)" @mousedown="ripple">{{ lang.btn.back }}</a>
          <a class="vicp-operate-btn" @click="prepareUpload" @mousedown="ripple">{{ lang.btn.save }}</a>
        </div>
      </div>

      <div v-if="step == 3" class="vicp-step3">
        <div class="vicp-upload">
          <span v-show="loading === 1" class="vicp-loading">{{ lang.loading }}</span>
          <div class="vicp-progress-wrap">
            <span v-show="loading === 1" :style="progressStyle" class="vicp-progress" />
          </div>
          <div v-show="hasError" class="vicp-error">
            <i class="vicp-icon2" /> {{ errorMsg }}
          </div>
          <div v-show="loading === 2" class="vicp-success">
            <i class="vicp-icon3" /> {{ lang.success }}
          </div>
        </div>
        <div class="vicp-operate">
          <a @click="setStep(2)" @mousedown="ripple">{{ lang.btn.back }}</a>
          <a @click="off" @mousedown="ripple">{{ lang.btn.close }}</a>
        </div>
      </div>
      <canvas v-show="false" ref="canvas" :width="width" :height="height" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
'use strict';
import request from '@/utils/request';
import language from './utils/language.js';
import mimes from './utils/mimes.js';
import data2blob from './utils/data2blob.js';
import effectRipple from './utils/effect-ripple.js';

export default {
  props: {
    // Upload field name
    field: {
      type: String,
      'default': 'avatar',
    },
    // Identify
    ki: {
      'default': 0,
    },
    // Show the control or stept
    value: {
      'default': true,
    },
    // URL to upload
    url: {
      type: String,
      'default': '',
    },
    // Other data to be uploaded along with file, as in object format
    params: {
      type: Object,
      'default': null,
    },
    // Add custom headers
    headers: {
      type: Object,
      'default': null,
    },
    // Width to crop
    width: {
      type: Number,
      default: 200,
    },
    // Height to crop
    height: {
      type: Number,
      default: 200,
    },
    // Show/hide rotation function
    stepRotate: {
      type: Boolean,
      default: true,
    },
    // Circle when preview image
    stepCircle: {
      type: Boolean,
      default: false,
    },
    // Square when preview image
    stepSquare: {
      type: Boolean,
      default: false,
    },
    // Max-size of single file
    maxSize: {
      type: Number,
      'default': 10240,
    },
    // Language type
    langType: {
      type: String,
      'default': 'en',
    },
    // Language pack
    langExt: {
      type: Object,
      'default': null,
    },
    // Image format
    imgFormat: {
      type: String,
      'default': 'png',
    },
    // For cross-domain support, credentials will be sent
    withCredentials: {
      type: Boolean,
      'default': false,
    },
  },
  data() {
    const that = this;
    const {
      imgFormat,
      langType,
      langExt,
      width,
      height,
    } = that;
    let isSupported = true;
    const allowedImgFormat = [
      'jpg',
      'png',
    ];
    const tempImgFormat = allowedImgFormat.indexOf(imgFormat) === -1 ? 'jpg' : imgFormat;
    const lang = language[langType] ? language[langType] : language['en'];
    const mime = mimes[tempImgFormat];
    // Specification image format
    that.imgFormat = tempImgFormat;
    if (langExt) {
      Object.assign(lang, langExt);
    }
    if (typeof FormData !== 'function') {
      isSupported = false;
    }

    return {
      // Mime image
      mime,
      // Language pack
      lang,
      // Check if browser supports this control
      isSupported,
      // Does the browser supports touch event?
      isSupportTouch: document.hasOwnProperty('ontouchstart'),
      // Step
      step: 1, // 1 - select file, 2 - crop, 3 - upload
      // Upload status and progress
      loading: 0, // 0 - stept started, 1 - is being loaded, 2 - success, 3 - error
      progress: 0,
      // Is the any error?
      hasError: false,
      errorMsg: '',
      // Aspect ratio
      ratio: width / height,
      // Original image URL
      sourceImg: null,
      sourceImgUrl: '',
      // Generated image URL
      createImgUrl: '',
      // Image drag event initial value
      sourceImgMouseDown: {
        on: false,
        mX: 0, // Mouse pressed coordinates
        mY: 0,
        x: 0, // scale original coordinates
        y: 0,
      },
      // Generate container size for image preview
      previewContainer: {
        width: 100,
        height: 100,
      },
      // Original container size
      sourceImgContainer: { // sic
        width: 240,
        height: 184, // If the generated graph scale is consistent with this, there will be a bug, first change to a special format
      },
      // Original image display attribute
      scale: {
        zoomAddOn: false, // Button zoom event is on/off
        zoomSubOn: false, // Button zoom event is on/off
        range: 1, // Up to 100
        rotateLeft: false, // Button left rotation event turned on
        rotateRight: false, // Button right rotation event turned on
        degree: 0, // Degree of rotation
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        maxWidth: 0,
        maxHeight: 0,
        minWidth: 0, // Min width
        minHeight: 0,
        naturalWidth: 0, // Original width
        naturalHeight: 0,
      },
    };
  },
  computed: {
    // Progress bar
    progressStyle() {
      const {
        progress,
      } = this;

      return {
        width: progress + '%',
      };
    },
    // Original image
    sourceImgStyle() {
      const {
        scale,
        sourceImgMasking,
      } = this;
      const top = scale.y + sourceImgMasking.y + 'px';
      const left = scale.x + sourceImgMasking.x + 'px';
      return {
        top,
        left,
        width: scale.width + 'px',
        height: scale.height + 'px',
        transform: 'rotate(' + scale.degree + 'deg)', // When rotating, the original image rotation style on the left side
        '-ms-transform': 'rotate(' + scale.degree + 'deg)', // Compatible with IE9
        '-moz-transform': 'rotate(' + scale.degree + 'deg)', // Compatible with FireFox
        '-webkit-transform': 'rotate(' + scale.degree + 'deg)', // Safari and Chrome
        '-o-transform': 'rotate(' + scale.degree + 'deg)', // Opera
      };
    },
    // Original mark attribute
    sourceImgMasking() {
      const {
        width,
        height,
        ratio,
        sourceImgContainer,
      } = this;
      const sic = sourceImgContainer;
      const sicRatio = sic.width / sic.height; // Original container aspect ratio
      let x = 0;
      let y = 0;
      let w = sic.width;
      let h = sic.height;
      let scale = 1;
      if (ratio < sicRatio) {
        scale = sic.height / height;
        w = sic.height * ratio;
        x = (sic.width - w) / 2;
      }
      if (ratio > sicRatio) {
        scale = sic.width / width;
        h = sic.width / ratio;
        y = (sic.height - h) / 2;
      }
      return {
        scale, // The mask is relatively wide and the demand is zoomed
        x,
        y,
        width: w,
        height: h,
      };
    },
    // Original mark style
    sourceImgShadeStyle() {
      const {
        sourceImgMasking,
        sourceImgContainer,
      } = this;
      const sic = sourceImgContainer;
      const sim = sourceImgMasking;
      const w = sim.width === sic.width ? sim.width : (sic.width - sim.width) / 2;
      const h = sim.height === sic.height ? sim.height : (sic.height - sim.height) / 2;
      return {
        width: w + 'px',
        height: h + 'px',
      };
    },
    previewStyle() {
      const {
        width,
        height,
        ratio,
        previewContainer,
      } = this;
      const pc = previewContainer;
      let w = pc.width;
      let h = pc.height;
      const pcRatio = w / h;
      if (ratio < pcRatio) {
        w = pc.height * ratio;
      }
      if (ratio > pcRatio) {
        h = pc.width / ratio;
      }
      return {
        width: w + 'px',
        height: h + 'px',
      };
    },
  },
  watch: {
    value(newValue) {
      if (newValue && this.loading !== 1) {
        this.reset();
      }
    },
  },
  methods: {
    // Click ripple effect
    ripple(e) {
      effectRipple(e);
    },
    // Close control
    off() {
      setTimeout(() => {
        this.$emit('input', false);
        this.$emit('close');
        if (this.step === 3 && this.loading === 2) {
          this.setStep(1);
        }
      }, 200);
    },
    // Setup steps
    setStep(step) {
      // This delay to show animation effect :)
      setTimeout(() => {
        this.step = step;
      }, 200);
    },
    /* Picture selection area function binding
     ---------------------------------------------------------------*/
    preventDefault(e) {
      e.preventDefault();
      return false;
    },
    handleClick(e) {
      if (this.loading !== 1) {
        if (e.target !== this.$refs.fileinput) {
          e.preventDefault();
          if (document.activeElement !== this.$refs) {
            this.$refs.fileinput.click();
          }
        }
      }
    },
    handleChange(e) {
      e.preventDefault();
      if (this.loading !== 1) {
        const files = e.target.files || e.dataTransfer.files;
        this.reset();
        if (this.checkFile(files[0])) {
          this.setSourceImg(files[0]);
        }
      }
    },
    /* ---------------------------------------------------------------*/
    // Check if the selected file is suitable
    checkFile(file) {
      const that = this;
      const {
        lang,
        maxSize,
      } = that;
      // Image only
      if (file.type.indexOf('image') === -1) {
        that.hasError = true;
        that.errorMsg = lang.error.onlyImg;
        return false;
      }
      // Check file size
      if (file.size / 1024 > maxSize) {
        that.hasError = true;
        that.errorMsg = lang.error.outOfSize + maxSize + 'kb';
        return false;
      }
      return true;
    },
    // Reset control
    reset() {
      const that = this;
      that.loading = 0;
      that.hasError = false;
      that.errorMsg = '';
      that.progress = 0;
    },
    // Set image source
    setSourceImg(file) {
      const that = this;
      const fr = new FileReader();

      fr.onload = function(e) {
        that.sourceImgUrl = fr.result;
        that.startCrop();
      };
      fr.readAsDataURL(file);
    },
    // Preparing before cropping
    startCrop() {
      const that = this;
      const {
        width,
        height,
        ratio,
        scale,
        sourceImgUrl,
        sourceImgMasking,
        lang,
      } = that;
      const sim = sourceImgMasking;
      const img = new Image();
      img.src = sourceImgUrl;
      img.onload = function() {
        const nWidth = img.naturalWidth;
        const nHeight = img.naturalHeight;
        const nRatio = nWidth / nHeight;
        let w = sim.width;
        let h = sim.height;
        let x = 0;
        let y = 0;
        // Image size don't meet the minimum requirement
        if (nWidth < width || nHeight < height) {
          that.hasError = true;
          that.errorMsg = lang.error.lowestPx + width + '*' + height;
          return false;
        }
        if (ratio > nRatio) {
          h = w / nRatio;
          y = (sim.height - h) / 2;
        }
        if (ratio < nRatio) {
          w = h * nRatio;
          x = (sim.width - w) / 2;
        }
        scale.range = 0;
        scale.x = x;
        scale.y = y;
        scale.width = w;
        scale.height = h;
        scale.degree = 0;
        scale.minWidth = w;
        scale.minHeight = h;
        scale.maxWidth = nWidth * sim.scale;
        scale.maxHeight = nHeight * sim.scale;
        scale.naturalWidth = nWidth;
        scale.naturalHeight = nHeight;
        that.sourceImg = img;
        that.createImg();
        that.setStep(2);
      };
    },
    // Mouse presses the picture ready to move
    imgStartMove(e) {
      e.preventDefault();
      // Support for touch events, mouse events are invalid
      if (this.isSupportTouch && !e.targetTouches) {
        return false;
      }
      const et = e.targetTouches ? e.targetTouches[0] : e;
      const {
        sourceImgMouseDown,
        scale,
      } = this;
      const simd = sourceImgMouseDown;
      simd.mX = et.screenX;
      simd.mY = et.screenY;
      simd.x = scale.x;
      simd.y = scale.y;
      simd.on = true;
    },
    // Move when the mouse is pressed, the picture moves
    imgMove(e) {
      e.preventDefault();
      // Support for touch events, mouse events are invalid
      if (this.isSupportTouch && !e.targetTouches) {
        return false;
      }
      const et = e.targetTouches ? e.targetTouches[0] : e;
      const {
        sourceImgMouseDown: {
          on,
          mX,
          mY,
          x,
          y,
        },
        scale,
        sourceImgMasking,
      } = this;
      const sim = sourceImgMasking;
      const nX = et.screenX;
      const nY = et.screenY;
      const dX = nX - mX;
      const dY = nY - mY;
      let rX = x + dX;
      let rY = y + dY;
      if (!on) {
        return;
      };
      if (rX > 0) {
        rX = 0;
      }
      if (rY > 0) {
        rY = 0;
      }
      if (rX < sim.width - scale.width) {
        rX = sim.width - scale.width;
      }
      if (rY < sim.height - scale.height) {
        rY = sim.height - scale.height;
      }
      scale.x = rX;
      scale.y = rY;
    },
    // Button press to start rotating to the right
    startRotateRight(e) {
      const that = this;
      const {
        scale,
      } = that;
      scale.rotateRight = true;
      function rotate() {
        if (scale.rotateRight) {
          const degree = ++scale.degree;
          that.createImg(degree);
          setTimeout(function() {
            rotate();
          }, 60);
        }
      }
      rotate();
    },
    // Button press to start rotating to the left
    startRotateLeft(e) {
      const that = this;
      const {
        scale,
      } = that;
      scale.rotateLeft = true;
      function rotate() {
        if (scale.rotateLeft) {
          const degree = --scale.degree;
          that.createImg(degree);
          setTimeout(function() {
            rotate();
          }, 60);
        }
      }
      rotate();
    },
    // Stop rotation
    endRotate() {
      const {
        scale,
      } = this;
      scale.rotateLeft = false;
      scale.rotateRight = false;
    },
    // Button press to zoom in
    startZoomAdd(e) {
      const that = this;
      const {
        scale,
      } = that;
      scale.zoomAddOn = true;
      function zoom() {
        if (scale.zoomAddOn) {
          const range = scale.range >= 100 ? 100 : ++scale.range;
          that.zoomImg(range);
          setTimeout(function() {
            zoom();
          }, 60);
        }
      }
      zoom();
    },
    // Button release or remove to cancel zoom in
    endZoomAdd(e) {
      this.scale.zoomAddOn = false;
    },
    // Button press to start zooming out
    startZoomSub(e) {
      const that = this;
      const {
        scale,
      } = that;
      scale.zoomSubOn = true;
      function zoom() {
        if (scale.zoomSubOn) {
          const range = scale.range <= 0 ? 0 : --scale.range;
          that.zoomImg(range);
          setTimeout(function() {
            zoom();
          }, 60);
        }
      }
      zoom();
    },
    // Button release or remove to cancel zoom out
    endZoomSub(e) {
      const {
        scale,
      } = this;
      scale.zoomSubOn = false;
    },
    zoomChange(e) {
      this.zoomImg(e.target.value);
    },
    // Zoom original
    zoomImg(newRange) {
      const that = this;
      const {
        sourceImgMasking,
        sourceImgMouseDown,
        scale,
      } = this;
      const {
        maxWidth,
        maxHeight,
        minWidth,
        minHeight,
        width,
        height,
        x,
        y,
        range,
      } = scale;
      const sim = sourceImgMasking;
      // Mask width
      const sWidth = sim.width;
      const sHeight = sim.height;
      // New width and height
      const nWidth = minWidth + (maxWidth - minWidth) * newRange / 100;
      const nHeight = minHeight + (maxHeight - minHeight) * newRange / 100;
      // New coordinates (scaled according to the center point of the mask)
      let nX = sWidth / 2 - (nWidth / width) * (sWidth / 2 - x);
      let nY = sHeight / 2 - (nHeight / height) * (sHeight / 2 - y);
      // Determine if the new coordinates exceed the mask limit
      if (nX > 0) {
        nX = 0;
      }
      if (nY > 0) {
        nY = 0;
      }
      if (nX < sWidth - nWidth) {
        nX = sWidth - nWidth;
      }
      if (nY < sHeight - nHeight) {
        nY = sHeight - nHeight;
      }
      // Process scaling
      scale.x = nX;
      scale.y = nY;
      scale.width = nWidth;
      scale.height = nHeight;
      scale.range = newRange;
      setTimeout(function() {
        if (scale.range === newRange) {
          that.createImg();
        }
      }, 300);
    },
    // Generate image
    createImg(e) {
      const that = this;
      const {
        mime,
        sourceImg,
        scale: {
          x,
          y,
          width,
          height,
          degree,
        },
        sourceImgMasking: {
          scale,
        },
      } = that;
      const canvas = that.$refs.canvas;
      const ctx = canvas.getContext('2d');
      if (e) {
        // Cancel the mouse to move the state
        that.sourceImgMouseDown.on = false;
      }
      canvas.width = that.width;
      canvas.height = that.height;
      ctx.clearRect(0, 0, that.width, that.height);
      // Set the transparent area to the white bottom
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, that.width, that.height);
      ctx.translate(that.width * 0.5, that.height * 0.5);
      ctx.rotate(Math.PI * degree / 180);
      ctx.translate(-that.width * 0.5, -that.height * 0.5);
      ctx.drawImage(sourceImg, x / scale, y / scale, width / scale, height / scale);
      that.createImgUrl = canvas.toDataURL(mime);
    },
    prepareUpload() {
      const {
        url,
        createImgUrl,
        field,
        ki,
      } = this;
      this.$emit('crop-success', createImgUrl, field, ki);
      if (typeof url === 'string' && url) {
        this.upload();
      } else {
        this.off();
      }
    },
    // Upload image
    upload() {
      const that = this;
      const {
        lang,
        imgFormat,
        mime,
        url,
        params,
        headers,
        field,
        ki,
        createImgUrl,
        withCredentials,
      } = this;
      const fmData = new FormData();
      fmData.append(field, data2blob(createImgUrl, mime), field + '.' + imgFormat);
      // Add other paramaters
      if (typeof params === 'object' && params) {
        Object.keys(params).forEach((k) => {
          fmData.append(k, params[k]);
        });
      }
      // Monitor progress callback
      const uploadProgress = function(event) {
        if (event.lengthComputable) {
          that.progress = 100 * Math.round(event.loaded) / event.total;
        }
      };
      // Upload files
      that.reset();
      that.loading = 1;
      that.setStep(3);
      request({
        url,
        method: 'post',
        data: fmData,
      }).then(resData => {
        that.loading = 2;
        that.$emit('crop-upload-success', resData.data);
      }).catch(err => {
        if (that.value) {
          that.loading = 3;
          that.hasError = true;
          that.errorMsg = lang.fail;
          that.$emit('crop-upload-fail', err, field, ki);
        }
      });
    },
  },
  created() {
    // Binding button esc to hide this plugin event
    document.addEventListener('keyup', (e) => {
      if (this.value && (e.key === 'Escape' || e.keyCode === 27)) {
        this.off();
      }
    });
  },
};
</script>

<style>
@charset "UTF-8";
@-webkit-keyframes vicp_progress {
  0% {
    background-position-y: 0; }
  100% {
    background-position-y: 40px; } }
@keyframes vicp_progress {
  0% {
    background-position-y: 0; }
  100% {
    background-position-y: 40px; } }
@-webkit-keyframes vicp {
  0% {
    opacity: 0;
    -webkit-transform: scale(0) translatey(-60px);
            transform: scale(0) translatey(-60px); }
  100% {
    opacity: 1;
    -webkit-transform: scale(1) translatey(0);
            transform: scale(1) translatey(0); } }
@keyframes vicp {
  0% {
    opacity: 0;
    -webkit-transform: scale(0) translatey(-60px);
            transform: scale(0) translatey(-60px); }
  100% {
    opacity: 1;
    -webkit-transform: scale(1) translatey(0);
            transform: scale(1) translatey(0); } }
.vue-image-crop-upload {
  position: fixed;
  display: block;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  z-index: 10000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  -webkit-tap-highlight-color: transparent;
  -moz-tap-highlight-color: transparent; }
  .vue-image-crop-upload .vicp-wrap {
    -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
    position: fixed;
    display: block;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    z-index: 10000;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 600px;
    height: 330px;
    padding: 25px;
    background-color: #fff;
    border-radius: 2px;
    -webkit-animation: vicp 0.12s ease-in;
            animation: vicp 0.12s ease-in; }
    .vue-image-crop-upload .vicp-wrap .vicp-close {
      position: absolute;
      right: -30px;
      top: -30px; }
      .vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4 {
        position: relative;
        display: block;
        width: 30px;
        height: 30px;
        cursor: pointer;
        -webkit-transition: -webkit-transform 0.18s;
        transition: -webkit-transform 0.18s;
        transition: transform 0.18s;
        transition: transform 0.18s, -webkit-transform 0.18s;
        -webkit-transform: rotate(0);
            -ms-transform: rotate(0);
                transform: rotate(0); }
        .vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4::after, .vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4::before {
          -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
                  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
          content: '';
          position: absolute;
          top: 12px;
          left: 4px;
          width: 20px;
          height: 3px;
          -webkit-transform: rotate(45deg);
              -ms-transform: rotate(45deg);
                  transform: rotate(45deg);
          background-color: #fff; }
        .vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4::after {
          -webkit-transform: rotate(-45deg);
              -ms-transform: rotate(-45deg);
                  transform: rotate(-45deg); }
        .vue-image-crop-upload .vicp-wrap .vicp-close .vicp-icon4:hover {
          -webkit-transform: rotate(90deg);
              -ms-transform: rotate(90deg);
                  transform: rotate(90deg); }
    .vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area {
      position: relative;
      -webkit-box-sizing: border-box;
              box-sizing: border-box;
      padding: 35px;
      height: 170px;
      background-color: rgba(0, 0, 0, 0.03);
      text-align: center;
      border: 1px dashed rgba(0, 0, 0, 0.08);
      overflow: hidden; }
      .vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area .vicp-icon1 {
        display: block;
        margin: 0 auto 6px;
        width: 42px;
        height: 42px;
        overflow: hidden; }
        .vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area .vicp-icon1 .vicp-icon1-arrow {
          display: block;
          margin: 0 auto;
          width: 0;
          height: 0;
          border-bottom: 14.7px solid rgba(0, 0, 0, 0.3);
          border-left: 14.7px solid transparent;
          border-right: 14.7px solid transparent; }
        .vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area .vicp-icon1 .vicp-icon1-body {
          display: block;
          width: 12.6px;
          height: 14.7px;
          margin: 0 auto;
          background-color: rgba(0, 0, 0, 0.3); }
        .vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area .vicp-icon1 .vicp-icon1-bottom {
          -webkit-box-sizing: border-box;
                  box-sizing: border-box;
          display: block;
          height: 12.6px;
          border: 6px solid rgba(0, 0, 0, 0.3);
          border-top: stepne; }
      .vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area .vicp-hint {
        display: block;
        padding: 15px;
        font-size: 14px;
        color: #666;
        line-height: 30px; }
      .vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area .vicp-step-supported-hint {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        padding: 30px;
        width: 100%;
        height: 60px;
        line-height: 30px;
        background-color: #eee;
        text-align: center;
        color: #666;
        font-size: 14px; }
      .vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area:hover {
        cursor: pointer;
        border-color: rgba(0, 0, 0, 0.1);
        background-color: rgba(0, 0, 0, 0.05); }
    .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop {
      overflow: hidden; }
      .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left {
        float: left; }
        .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-img-container {
          position: relative;
          display: block;
          width: 240px;
          height: 180px;
          background-color: #e5e5e0;
          overflow: hidden; }
          .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-img-container .vicp-img {
            position: absolute;
            display: block;
            cursor: move;
            -webkit-user-select: stepne;
               -moz-user-select: stepne;
                -ms-user-select: stepne;
                    user-select: stepne; }
          .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-img-container .vicp-img-shade {
            -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);
                    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);
            position: absolute;
            background-color: rgba(241, 242, 243, 0.8); }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-img-container .vicp-img-shade.vicp-img-shade-1 {
              top: 0;
              left: 0; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-img-container .vicp-img-shade.vicp-img-shade-2 {
              bottom: 0;
              right: 0; }
        .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-rotate {
          position: relative;
          width: 240px;
          height: 18px; }
          .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-rotate i {
            display: block;
            width: 18px;
            height: 18px;
            border-radius: 100%;
            line-height: 18px;
            text-align: center;
            font-size: 12px;
            font-weight: bold;
            background-color: rgba(0, 0, 0, 0.08);
            color: #fff;
            overflow: hidden; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-rotate i:hover {
              -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
                      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
              cursor: pointer;
              background-color: rgba(0, 0, 0, 0.14); }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-rotate i:first-child {
              float: left; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-rotate i:last-child {
              float: right; }
        .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range {
          position: relative;
          margin: 30px 0 10px 0;
          width: 240px;
          height: 18px; }
          .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon5,
          .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon6 {
            position: absolute;
            top: 0;
            width: 18px;
            height: 18px;
            border-radius: 100%;
            background-color: rgba(0, 0, 0, 0.08); }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon5:hover,
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon6:hover {
              -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
                      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
              cursor: pointer;
              background-color: rgba(0, 0, 0, 0.14); }
          .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon5 {
            left: 0; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon5::before {
              position: absolute;
              content: '';
              display: block;
              left: 3px;
              top: 8px;
              width: 12px;
              height: 2px;
              background-color: #fff; }
          .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon6 {
            right: 0; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon6::before {
              position: absolute;
              content: '';
              display: block;
              left: 3px;
              top: 8px;
              width: 12px;
              height: 2px;
              background-color: #fff; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range .vicp-icon6::after {
              position: absolute;
              content: '';
              display: block;
              top: 3px;
              left: 8px;
              width: 2px;
              height: 12px;
              background-color: #fff; }
          .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range] {
            display: block;
            padding-top: 5px;
            margin: 0 auto;
            width: 180px;
            height: 8px;
            vertical-align: top;
            background: transparent;
            -webkit-appearance: stepne;
               -moz-appearance: stepne;
                    appearance: stepne;
            cursor: pointer;
            /* Slider
               ---------------------------------------------------------------*/
            /* Track
               ---------------------------------------------------------------*/ }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]:focus {
              outline: stepne; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]::-webkit-slider-thumb {
              -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);
                      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);
              -webkit-appearance: stepne;
                      appearance: stepne;
              margin-top: -3px;
              width: 12px;
              height: 12px;
              background-color: #61c091;
              border-radius: 100%;
              border: stepne;
              -webkit-transition: 0.2s;
              transition: 0.2s; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]::-moz-range-thumb {
              box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);
              -moz-appearance: stepne;
                   appearance: stepne;
              width: 12px;
              height: 12px;
              background-color: #61c091;
              border-radius: 100%;
              border: stepne;
              -webkit-transition: 0.2s;
              transition: 0.2s; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]::-ms-thumb {
              box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.18);
              appearance: stepne;
              width: 12px;
              height: 12px;
              background-color: #61c091;
              border: stepne;
              border-radius: 100%;
              -webkit-transition: 0.2s;
              transition: 0.2s; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]:active::-moz-range-thumb {
              box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
              width: 14px;
              height: 14px; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]:active::-ms-thumb {
              box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
              width: 14px;
              height: 14px; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]:active::-webkit-slider-thumb {
              -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
                      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
              margin-top: -4px;
              width: 14px;
              height: 14px; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]::-webkit-slider-runnable-track {
              -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
                      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
              width: 100%;
              height: 6px;
              cursor: pointer;
              border-radius: 2px;
              border: stepne;
              background-color: rgba(68, 170, 119, 0.3); }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]::-moz-range-track {
              box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
              width: 100%;
              height: 6px;
              cursor: pointer;
              border-radius: 2px;
              border: stepne;
              background-color: rgba(68, 170, 119, 0.3); }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]::-ms-track {
              box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
              width: 100%;
              cursor: pointer;
              background: transparent;
              border-color: transparent;
              color: transparent;
              height: 6px;
              border-radius: 2px;
              border: stepne; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]::-ms-fill-lower {
              background-color: rgba(68, 170, 119, 0.3); }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]::-ms-fill-upper {
              background-color: rgba(68, 170, 119, 0.15); }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]:focus::-webkit-slider-runnable-track {
              background-color: rgba(68, 170, 119, 0.5); }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]:focus::-moz-range-track {
              background-color: rgba(68, 170, 119, 0.5); }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]:focus::-ms-fill-lower {
              background-color: rgba(68, 170, 119, 0.45); }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-left .vicp-range input[type=range]:focus::-ms-fill-upper {
              background-color: rgba(68, 170, 119, 0.25); }
      .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right {
        float: right; }
        .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview {
          height: 150px;
          overflow: hidden; }
          .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview .vicp-preview-item {
            position: relative;
            padding: 5px;
            width: 100px;
            height: 100px;
            float: left;
            margin-right: 16px; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview .vicp-preview-item span {
              position: absolute;
              bottom: -30px;
              width: 100%;
              font-size: 14px;
              color: #bbb;
              display: block;
              text-align: center; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview .vicp-preview-item img {
              position: absolute;
              display: block;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              margin: auto;
              padding: 3px;
              background-color: #fff;
              border: 1px solid rgba(0, 0, 0, 0.15);
              overflow: hidden;
              -webkit-user-select: stepne;
                 -moz-user-select: stepne;
                  -ms-user-select: stepne;
                      user-select: stepne; }
            .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview .vicp-preview-item.vicp-preview-item-circle {
              margin-right: 0; }
              .vue-image-crop-upload .vicp-wrap .vicp-step2 .vicp-crop .vicp-crop-right .vicp-preview .vicp-preview-item.vicp-preview-item-circle img {
                border-radius: 100%; }
    .vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload {
      position: relative;
      -webkit-box-sizing: border-box;
              box-sizing: border-box;
      padding: 35px;
      height: 170px;
      background-color: rgba(0, 0, 0, 0.03);
      text-align: center;
      border: 1px dashed #ddd; }
      .vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload .vicp-loading {
        display: block;
        padding: 15px;
        font-size: 16px;
        color: #999;
        line-height: 30px; }
      .vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload .vicp-progress-wrap {
        margin-top: 12px;
        background-color: rgba(0, 0, 0, 0.08);
        border-radius: 3px; }
        .vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload .vicp-progress-wrap .vicp-progress {
          position: relative;
          display: block;
          height: 5px;
          border-radius: 3px;
          background-color: #4a7;
          -webkit-box-shadow: 0 2px 6px 0 rgba(68, 170, 119, 0.3);
                  box-shadow: 0 2px 6px 0 rgba(68, 170, 119, 0.3);
          -webkit-transition: width 0.15s linear;
          transition: width 0.15s linear;
          background-image: -webkit-linear-gradient(135deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent);
          background-image: linear-gradient(-45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent);
          background-size: 40px 40px;
          -webkit-animation: vicp_progress 0.5s linear infinite;
                  animation: vicp_progress 0.5s linear infinite; }
          .vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload .vicp-progress-wrap .vicp-progress::after {
            content: '';
            position: absolute;
            display: block;
            top: -3px;
            right: -3px;
            width: 9px;
            height: 9px;
            border: 1px solid rgba(245, 246, 247, 0.7);
            -webkit-box-shadow: 0 1px 4px 0 rgba(68, 170, 119, 0.7);
                    box-shadow: 0 1px 4px 0 rgba(68, 170, 119, 0.7);
            border-radius: 100%;
            background-color: #4a7; }
      .vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload .vicp-error,
      .vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload .vicp-success {
        height: 100px;
        line-height: 100px; }
    .vue-image-crop-upload .vicp-wrap .vicp-operate {
      position: absolute;
      right: 20px;
      bottom: 20px; }
      .vue-image-crop-upload .vicp-wrap .vicp-operate a {
        position: relative;
        float: left;
        display: block;
        margin-left: 10px;
        width: 100px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        font-size: 14px;
        color: #4a7;
        border-radius: 2px;
        overflow: hidden;
        -webkit-user-select: stepne;
           -moz-user-select: stepne;
            -ms-user-select: stepne;
                user-select: stepne; }
        .vue-image-crop-upload .vicp-wrap .vicp-operate a:hover {
          background-color: rgba(0, 0, 0, 0.03); }
    .vue-image-crop-upload .vicp-wrap .vicp-error,
    .vue-image-crop-upload .vicp-wrap .vicp-success {
      display: block;
      font-size: 14px;
      line-height: 24px;
      height: 24px;
      color: #d10;
      text-align: center;
      vertical-align: top; }
    .vue-image-crop-upload .vicp-wrap .vicp-success {
      color: #4a7; }
    .vue-image-crop-upload .vicp-wrap .vicp-icon3 {
      position: relative;
      display: inline-block;
      width: 20px;
      height: 20px;
      top: 4px; }
      .vue-image-crop-upload .vicp-wrap .vicp-icon3::after {
        position: absolute;
        top: 3px;
        left: 6px;
        width: 6px;
        height: 10px;
        border-width: 0 2px 2px 0;
        border-color: #4a7;
        border-style: solid;
        -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
                transform: rotate(45deg);
        content: ''; }
    .vue-image-crop-upload .vicp-wrap .vicp-icon2 {
      position: relative;
      display: inline-block;
      width: 20px;
      height: 20px;
      top: 4px; }
      .vue-image-crop-upload .vicp-wrap .vicp-icon2::after, .vue-image-crop-upload .vicp-wrap .vicp-icon2::before {
        content: '';
        position: absolute;
        top: 9px;
        left: 4px;
        width: 13px;
        height: 2px;
        background-color: #d10;
        -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
                transform: rotate(45deg); }
      .vue-image-crop-upload .vicp-wrap .vicp-icon2::after {
        -webkit-transform: rotate(-45deg);
            -ms-transform: rotate(-45deg);
                transform: rotate(-45deg); }
.e-ripple {
  position: absolute;
  border-radius: 100%;
  background-color: rgba(0, 0, 0, 0.15);
  background-clip: padding-box;
  pointer-events: stepne;
  -webkit-user-select: stepne;
     -moz-user-select: stepne;
      -ms-user-select: stepne;
          user-select: stepne;
  -webkit-transform: scale(0);
      -ms-transform: scale(0);
          transform: scale(0);
  opacity: 1; }
  .e-ripple.z-active {
    opacity: 0;
    -webkit-transform: scale(2);
        -ms-transform: scale(2);
            transform: scale(2);
    -webkit-transition: opacity 1.2s ease-out, -webkit-transform 0.6s ease-out;
    transition: opacity 1.2s ease-out, -webkit-transform 0.6s ease-out;
    transition: opacity 1.2s ease-out, transform 0.6s ease-out;
    transition: opacity 1.2s ease-out, transform 0.6s ease-out, -webkit-transform 0.6s ease-out; }
</style>

/**
 * Click ripple effect
 *
 * @param  {[event]} e        [description]
 * @param  {[Object]} argOpts [description]
 * @return {[bollean]}          [description]
 */
export default function(e, argOpts) {
  var opts = Object.assign({
    ele: e.target, // Corrugated element
    type: 'hit', // Hit click position spread center center point expansion
    bgc: 'rgba(0, 0, 0, 0.15)', // Ripple color
  }, argOpts);
  var target = opts.ele;
  if (target) {
    var rect = target.getBoundingClientRect();
    var ripple = target.querySelector('.e-ripple');
    if (!ripple) {
      ripple = document.createElement('span');
      ripple.className = 'e-ripple';
      ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
      target.appendChild(ripple);
    } else {
      ripple.className = 'e-ripple';
    }
    switch (opts.type) {
      case 'center':
        ripple.style.top = (rect.height / 2 - ripple.offsetHeight / 2) + 'px';
        ripple.style.left = (rect.width / 2 - ripple.offsetWidth / 2) + 'px';
        break;
      default:
        ripple.style.top = (e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop) + 'px';
        ripple.style.left = (e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft) + 'px';
    }
    ripple.style.backgroundColor = opts.bgc;
    ripple.className = 'e-ripple z-active';
    return false;
  }
}

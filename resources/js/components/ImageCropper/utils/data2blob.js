/**
 * database64文件格式转换为2进制
 *
 * @param  {[String]} data The format of the dataURL is "data:image/png;base64,****". The comma is preceded by some descriptive text. We only need the comma after the line.
 * @param  {[String]} mime [description]
 * @return {[blob]}      [description]
 */
export default function(data, mime) {
  data = data.split(',')[1];
  data = window.atob(data);
  var ia = new Uint8Array(data.length);
  for (var i = 0; i < data.length; i++) {
    ia[i] = data.charCodeAt(i);
  }
  // The default format returned by canvas.toDataURL is image/png
  return new Blob([ia], {
    type: mime,
  });
}

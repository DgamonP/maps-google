export function get_static_style(styles) {
    var result = [];
    styles.forEach(function (v, i, a) {
      var style = '';
      if (v.stylers.length > 0) { // Needs to have a style rule to be valid.
        style += (v.hasOwnProperty('featureType') ? 'feature:' + v.featureType : 'feature:all') + '|';
        style += (v.hasOwnProperty('elementType') ? 'element:' + v.elementType : 'element:all') + '|';
        v.stylers.forEach(function (val, i, a) {
          var propertyname = Object.keys(val)[0];
          var propertyval = val[propertyname].toString().replace('#', '0x');
          style += propertyname + ':' + propertyval + '|';
        });
      }
      result.push('style=' + encodeURIComponent(style))
    });
  
    return result.join('&');
  }
  
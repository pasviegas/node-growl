var sys = require('sys');
// Growl - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)
(function(){	
	/**
     * Execute the given _cmd_, returning an array of lines from stdout.
     *
     * Examples:
     *
     *   Growl.exec('growlnotify', '-m', msg)
     *
     * @param  {string ...} cmd
     * @return {array}
     * @api public
     */
    var exec = function() {
		sys.exec(Array.prototype.join.apply(arguments, [" "]));
    }
    
    /**
     * Return the extension of the given _path_ or null.
     *
     * @param  {string} path
     * @return {string}
     * @api private
     */  
    var extname = function(path) {
      return path.lastIndexOf('.') != -1 ? 
        path.slice(path.lastIndexOf('.') + 1, path.length) :
          null
    }  


  Growl = {
    
    // --- Version   
    version: '1.0.0',
    /**
     * Send growl notification _msg_ with _options_.
     *
     * Options:
     *
     *  - title   Notification title
     *  - sticky  Make the notification stick (defaults to false)
     *  - name    Application name (defaults to growlnotify)
     *  - image
     *    - path to an icon sets --iconpath
     *    - path to an image sets --image
     *    - capitalized word sets --appIcon
     *    - filename uses extname as --icon
     *    - otherwise treated as --icon
     *
     * Examples:
     *
     *   Growl.notify('New email')
     *   Growl.notify('5 new emails', { title: 'Thunderbird' })
     *
     * @param {string} msg
     * @param {options} hash
     * @api public
     */
    notify: function(msg, options) {
      options = options || {}
      var args = ['growlnotify', '-m', msg]
      if (image = options.image) {
        var flag, ext = extname(image)
        flag = flag || ext == 'icns' && 'iconpath'
        flag = flag || /^[A-Z]/.test(image) && 'appIcon'
        flag = flag || /^png|gif|jpe?g$/.test(ext) && 'image'
        flag = flag || ext && (image = ext) && 'icon'
        flag = flag || 'icon'
        args.push('--' + flag, image)
      }
      if (options.sticky) args.push('--sticky')
      if (options.name) args.push('--name', options.name)
      if (options.title) args.push(options.title)
      exec.apply(this, args)
    }
  }

})()

exports.Growl = Growl
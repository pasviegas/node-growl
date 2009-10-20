
// Growl - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

;(function(){
  
  Growl = {
    
    // --- Version
    
    version: '0.0.1',
    
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

    exec: function(cmd) {
      var lines = [], line
      with (JavaImporter(java.lang, java.io)) {
        var proccess = Runtime.getRuntime().exec(Array.prototype.slice.call(arguments))
        var stream = new DataInputStream(proccess.getInputStream())
        while (line = stream.readLine())
          lines.push(line + '')
        stream.close()    
      }
      return lines
    },

    /**
     * Version of the 'growlnotify' binary.
     *
     * @return {string}
     * @api private
     */

    binVersion: function() {
      try { return this.exec('growlnotify', '-v')[0].split(' ')[1] } catch (e) {}
    },

    /**
     * Send growl notification _msg_ with _options_.
     *
     * Options:
     *
     *  - title   Notification title
     *  - name    Application name (defaults to growlnotify)
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
      if (!this.binVersion()) throw new Error('growlnotify executable is required')
      if (options.name) args.push('--name', options.name)
      if (options.title) args.push(options.title)
      this.exec.apply(this, args)
    }
  }
  
})()

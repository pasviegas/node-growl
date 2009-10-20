
// Growl - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

;(function(){
  
  /**
   * Execute the given _cmd_, returning an array of lines from stdout.
   *
   *   Growl.exec('growlnotify', '-m', msg)
   *
   * @param  {string ...} cmd
   * @return {array}
   * @api public
   */
  
  function exec(cmd) {
    var lines = [], line
    with (JavaImporter(java.lang, java.io)) {
      var proccess = Runtime.getRuntime().exec(Array.prototype.slice.call(arguments))
      var stream = new DataInputStream(proccess.getInputStream())
      while (line = stream.readLine())
        lines.push(line)
      stream.close()    
    }
    return lines
  }
  
  /**
   * Version of the 'growlnotify' binary.
   *
   * @return {string}
   * @api private
   */
  
  function version() {
    try { return exec('growlnotify', '-v')[0].split(' ')[1] } catch (e) {}
  }
  
  /**
   * Send growl notification _msg_ with _options_.
   *
   * Options:
   *
   *  - title  Notification title
   *
   *   Growl.notify('New email')
   *   Growl.notify('5 new emails', { title: 'Thunderbird' })
   *
   * @param {string} msg
   * @param {options} hash
   * @api public
   */
  
  function notify(msg, options) {
    options = options || {}
    if (!Growl.version) throw new Error('growlnotify executable is required')
    exec('growlnotify', '-m', msg, options.title || '')
  }
  
  // --- Expose
  
  Growl = {
    exec: exec,
    version: version(),
    notify: notify
  }
  
})()


# Growl for JavaScript (Rhino)

lib/growl.js adds Growl support for the Rhino JavaScript engine. This is
essentially a port of my [Ruby Growl Library](http://github.com/visionmedia/growl).

## Examples

@@@ javascript
    Growl.notify('You have mail!')
    Growl.notify('5 new messages', { sticky: true })
    Growl.notify('5 new emails', { title: 'Email Client', image: 'Safari', sticky: true })
    Growl.notify('Show Safari icon', { image: 'Safari' })
    Growl.notify('Show icon', { image: 'path/to/icon.icns' })
    Growl.notify('Show image', { image: 'path/to/my.image.png' })
    Growl.notify('Show png filesystem icon', { image: 'png' })
    Growl.notify('Show pdf filesystem icon', { image: 'article.pdf' })
@@@

## Options

  - title
    - notification title
  - name
    - application name
  - sticky
    - weither or not the notification should remainin until closed
  - image
    - Auto-detects the context:
      - path to an icon sets --iconpath
      - path to an image sets --image
      - capitalized word sets --appIcon
      - filename uses extname as --icon
      - otherwise treated as --icon
      
## Semi-Public API

You may execute an arbitrary command by passing
one or more arguments, returning an array of stdout 
lines for example:

    Growl.exec('ls')
    // => [...]
    
    Growl.exec('ls', '-a')
    // => [...]
    
Return the current version of 'growlnotify':

    Growl.binVersion() 
    // => 'n.n.n'

Get filepath extension name:

    Growl.extname('foo.bar.js')
    // => 'js'

## More Information

 * For in-depth documentation please view spec/spec.core.js

## License 

(The MIT License)

Copyright (c) 2009 TJ Holowaychuk <tj@vision-media.ca>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
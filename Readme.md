
# Growl for nodejs

lib/growl.js adds Growl support for nodejs

## Examples

    Growl.notify('You have mail!')
    Growl.notify('5 new messages', { sticky: true })
    Growl.notify('5 new emails', { title: 'Email Client', image: 'Safari', sticky: true })
    Growl.notify('Show Safari icon', { image: 'Safari' })
    Growl.notify('Show icon', { image: 'path/to/icon.icns' })
    Growl.notify('Show image', { image: 'path/to/my.image.png' })
    Growl.notify('Show png filesystem icon', { image: 'png' })
    Growl.notify('Show pdf filesystem icon', { image: 'article.pdf' })

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
      
## Thanks to
	- TJ Holowaychuk (js-grow;) <tj@vision-media.ca>
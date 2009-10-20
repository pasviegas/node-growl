
describe 'Growl'
  before
    var exec = Growl.exec
    Growl.exec = function(){
      args = Array.prototype.slice.apply(arguments)
      return exec.apply(this, arguments)
    }
  end
  
  describe '.version'
    it 'should be a version triple for our Growl library'
      Growl.version.should.match(/^\d+\.\d+\.\d+$/)
    end  
  end
  
  describe '.extname()'
    describe 'given a filename'
      it 'should return the extension'
        Growl.extname('something.js').should.eql 'js'
      end
    end
    
    describe 'given a complicated filename'
      it 'should return the extension'
        Growl.extname('foo bar.something.else.js').should.eql 'js'
      end
    end
    
    describe 'given a path without an extension'
      it 'should return null'
        Growl.extname('foo').should.be_null
      end
    end
  end
  
  describe '.binVersion()'
    it 'should be set to the growlnotify version'
      Growl.binVersion().should.match(/^\d+\.\d+\.\d+$/)
    end  
  end
  
  describe '.exec()'
    it 'should execute a single arg command'
      Growl.exec('ls').length.should.be_at_least 1
    end
    
    it 'should execute multi-arg commands'
      Growl.exec('ls', '-ls').length.should.be_at_least 1
    end
  end
  
  describe '.notify()'
    describe 'given a message only'
      it 'should add the -m option'
        Growl.notify('wahoo')
        args.should.eql ['growlnotify', '-m', 'wahoo']
      end
    end
    
    describe 'given the title option'
      it 'should add a trailing argument'
        Growl.notify('5 passes', { title: 'JSpec' })
        args.should.eql ['growlnotify', '-m', '5 passes', 'JSpec']
      end
    end
    
    describe 'given the name option'
      it 'should add the --name switch'
        Growl.notify('5 passes', { name: 'jspec' })
        args.should.eql ['growlnotify', '-m', '5 passes', '--name', 'jspec']
      end
    end
    
    describe 'given the sticky option'
      it 'should add the --sticky switch'
        Growl.notify('5 passes', { sticky: true })
        args.should.eql ['growlnotify', '-m', '5 passes', '--sticky']
      end
      
      it 'should add nothing when false'
        Growl.notify('5 passes', { sticky: false })
        args.should.eql ['growlnotify', '-m', '5 passes']
      end
    end
    
    describe 'given the image option'
      it 'should add --iconpath when *.icns'
        Growl.notify('5 passes', { image: 'pass.icns' })
        args.should.eql ['growlnotify', '-m', '5 passes', '--iconpath', 'pass.icns']
      end
      
      it 'should add --image when *.{png,jpeg,jpg,gif}'
        Growl.notify('5 passes', { image: 'pass.png' })
        args.should.eql ['growlnotify', '-m', '5 passes', '--image', 'pass.png']
        Growl.notify('5 passes', { image: 'pass.jpeg' })     
        args.should.eql ['growlnotify', '-m', '5 passes', '--image', 'pass.jpeg']
        Growl.notify('5 passes', { image: 'pass.jpg' })      
        args.should.eql ['growlnotify', '-m', '5 passes', '--image', 'pass.jpg']
        Growl.notify('5 passes', { image: 'pass.gif' })      
        args.should.eql ['growlnotify', '-m', '5 passes', '--image', 'pass.gif']
      end
      
      it 'should add --appIcon when capitalized word'
        Growl.notify('5 passes', { image: 'Safari' })
        args.should.eql ['growlnotify', '-m', '5 passes', '--appIcon', 'Safari']
      end
      
      it 'should add --icon with extname when arbitrary filename is given'
        Growl.notify('5 passes', { image: 'my.awesome.pdf' })
        args.should.eql ['growlnotify', '-m', '5 passes', '--icon', 'pdf']
      end
      
      it 'should add --icon with extname'
        Growl.notify('5 passes', { image: 'pdf' })
        args.should.eql ['growlnotify', '-m', '5 passes', '--icon', 'pdf']
      end
    end
    
    describe 'given several options'
      it 'should still work'
        Growl.notify('5 new emails', { title: 'Email Client', image: 'Safari', sticky: true })
        args.should.eql ['growlnotify', '-m', '5 new emails', '--appIcon', 'Safari', '--sticky', 'Email Client']
      end
    end
  end
end

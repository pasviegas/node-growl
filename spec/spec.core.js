
describe 'Growl'
  before_each 
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
  end
end
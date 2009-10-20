
describe 'Growl'
  describe '.exec()'
    it 'should execute a single arg command'
      Growl.exec('ls').length.should.be_at_least 1
    end
    
    it 'should execute multi-arg commands'
      Growl.exec('ls', '-ls').length.should.be_at_least 1
    end
  end
end
describe('Visit React Website', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.url().should('include', '/')
  })

  it('Check Front Page', () => {
    cy.get('img').should('be.visible')
    cy.get('.header__ul').first().within(($ul) => {
      cy.get('li').eq(0).contains('My Website')
      cy.get('li').eq(1).contains('Investment Calculator')
      cy.get('li').eq(2).contains('Other Projects')
    })
  })

  it('Perform redirection to page called Other', () => {
    cy.get('.header__ul').within(($ul) => {
      cy.get('li').eq(2).click()
    })
    cy.url().should('include', '/OtherProjects')

    cy.get('h1').contains('Coming Soon...')
    cy.get('.header__ul').within(($ul) => {
      cy.get('li').eq(0).contains('Other Projects!')
      cy.get('li').eq(1).contains('About Me')
      cy.get('li').eq(2).contains('Investment Calculator') 
      cy.get('li').eq(1).click()
    })
  })
})

describe('Test Input Form', () => {
  beforeEach(() => {
    cy.visit('/InvestmentCalculator')
    cy.url().should('include', '/InvestmentCalculator')
  })

  it('Should Check if inputs are being used and chart and information is outputted', () => {
    cy.get('input[name=hours]').type('15')
    cy.get('input[name=salary]').type('900')
    cy.get('select[name=salaryConversionRate]').select('Hour')
    cy.get('select[name=afterCalculationTime]').select('Biweek')
    cy.get('button[name=compute]').click()
    cy.get('form[data-cy=afterCalculation]').within(($form) => {
      cy.get('p').eq(0).contains('27000')
      cy.get('p').eq(1).contains('16532.7')
    })
  })

  it('Check for Errors in input form', () => {
    const stub = cy.stub()
    cy.on("window:alert", stub)

    cy.get('input[name=hours]').type('NaN')
    cy.get('input[name=salary]').type('NaN')
    cy.get('button[name=compute]').click().then(() => { 
      expect(stub.getCall(0)).to.be.calledWith("Please enter numbers in the textboxes!")
    })
    
    cy.get('input[name=hours]').type('{backspace}{backspace}{backspace}-9')
    cy.get('input[name=salary]').type('{backspace}{backspace}{backspace}-180')
    cy.get('button[name=compute]').click().then(() => { 
      expect(stub.getCall(2)).to.be.calledWith("Please enter positive numbers in the textboxes!")
    })
    
    cy.get('input[name=hours]').type('{backspace}{backspace}700')
    cy.get('input[name=salary]').type('{backspace}{backspace}{backspace}{backspace}800')
    cy.get('button[name=compute]').click().then(() => { 
      expect(stub.getCall(4)).to.be.calledWith("You can't work over 168 hours every week!")
    })
  })

  it('Verify Reset Button works for every event element', () => {
    cy.get('input[name=hours]').type('40')
    cy.get('input[name=salary]').type('7.25')
    cy.get('select[name=salaryConversionRate]').select('Hour')
    cy.get('select[name=afterCalculationTime]').select('Biweek')
    cy.get('button[name=advanced]').click()
    cy.get('form[data-cy=advancedForm]').within(($advancedForm) => {
      cy.get('label[data-cy=isSelfEmployed]').click()
      cy.get('label[data-cy=addDebtCalculator]').click()
    })
    cy.get('form[data-cy=debtCalculator]').within(($debtForm) => {
      cy.get('input[data-cy=principal]').type('25000')
      cy.get('input[data-cy=interest]').type('5.6')
      cy.get('input[data-cy=loanMonths]').type('24')
      cy.get('button[data-cy=addDebt]').click()
    })
    cy.get('button[name=compute]').click()

    cy.get('form[data-cy=afterCalculation]').should('exist')
    cy.get('div[data-cy=taxChart]').should('exist')
    cy.get('div[data-cy=debtChart]').should('exist')

    cy.get('button[name=reset]').click()
    cy.get('input[name=hours]').should('have.value', '')
    cy.get('input[name=salary]').should('have.value', '')
    cy.get('select[name=salaryConversionRate]').should('have.value','Hour')
    cy.get('select[name=afterCalculationTime]').should('have.value','Year')
    cy.get('form[data-cy=afterCalculation]').should('not.exist')
    cy.get('div[data-cy=taxChart]').should('not.exist')
    cy.get('div[data-cy=debtChart]').should('not.exist')
    cy.get('form[data-cy=debtCalculator]').should('not.exist')
    cy.get('form[data-cy=advancedForm]').should('not.exist')

    cy.get('button[name=advanced]').click()
    cy.get('form[data-cy=advancedForm]').within(($advancedForm) => {
      cy.get('label[data-cy=isSelfEmployed]').should('not.be.checked')
      cy.get('label[data-cy=addDebtCalculator]').click()
    })
    cy.get('ul[data-cy=debtList] > li').should('have.length', 0)
  })
})

describe('Test Debt Calculator', () => {
  beforeEach(() => {
    cy.visit('/InvestmentCalculator')
    cy.get('button[name=advanced]').click()
    cy.get('form[data-cy=advancedForm]').within(($advancedForm) => {
      cy.get('label[data-cy=addDebtCalculator]').click()
    })
  })

  it('Should correctly output 1 debt from 3 inputs', () => {
    cy.get('form[data-cy=debtCalculator]').within(($debtForm) => {
      cy.get('input[data-cy=principal]').type('25000')
      cy.get('input[data-cy=interest]').type('5.6')
      cy.get('input[data-cy=loanMonths]').type('24')
      cy.get('button[data-cy=addDebt]').click()
      cy.get('ul[data-cy=debtList] > li').should('have.length', 1)
      cy.get('ul[data-cy=debtList] > li').eq(0).contains('Debt 1: Principal: 25000 Interest: 5.6 Loan Term : 24 months')
    })
  })

  it('Should correctly output 3 debts from 3 inputs with removal', () => {
    cy.get('input[data-cy=principal]').type('25000')
    cy.get('input[data-cy=interest]').type('5.6')
    cy.get('input[data-cy=loanMonths]').type('24')
    cy.get('button[data-cy=addDebt]').click()
    cy.get('ul[data-cy=debtList] > li').should('have.length', 1)
    cy.get('ul[data-cy=debtList] > li').eq(0).contains('Debt 1: Principal: 25000 Interest: 5.6 Loan Term : 24 months')

    cy.get('input[data-cy=principal]').type('{backspace}{backspace}{backspace}{backspace}{backspace}60000')
    cy.get('input[data-cy=interest]').type('{backspace}{backspace}{backspace}8.9')
    cy.get('button[data-cy=addDebt]').click()
    cy.get('ul[data-cy=debtList] > li').should('have.length', 2)
    cy.get('ul[data-cy=debtList] > li').eq(0).contains('Debt 1: Principal: 25000 Interest: 5.6 Loan Term : 24 months')
    cy.get('ul[data-cy=debtList] > li').eq(1).contains('Debt 2: Principal: 60000 Interest: 8.9 Loan Term : 24 months')
    
    cy.get('input[data-cy=interest]').type('{backspace}{backspace}{backspace}15.6')
    cy.get('button[data-cy=addDebt]').click()
    cy.get('button[data-cy=addDebt]').click()
    cy.get('ul[data-cy=debtList] > li').should('have.length', 4)
    cy.get('ul[data-cy=debtList] > li').eq(1).click()
    cy.get('ul[data-cy=debtList] > li').eq(0).contains('Debt 1: Principal: 25000 Interest: 5.6 Loan Term : 24 months')
    cy.get('ul[data-cy=debtList] > li').eq(1).contains('Debt 2: Principal: 60000 Interest: 15.6 Loan Term : 24 months')
    cy.get('ul[data-cy=debtList] > li').eq(2).contains('Debt 3: Principal: 60000 Interest: 15.6 Loan Term : 24 months')
    cy.get('ul[data-cy=debtList] > li').should('have.length', 3)
  })

  it('Get Window Alert with reaching maximum debts', () => {
    cy.get('input[data-cy=principal]').type('25000')
    cy.get('input[data-cy=interest]').type('5.6')
    cy.get('input[data-cy=loanMonths]').type('24')

    const stub = cy.stub()
    cy.on("window:alert", stub)
    for(let i = 0;i < 5; i++) {
      cy.get('button[data-cy=addDebt]').click()
    }
    cy.get('button[data-cy=addDebt]').click().then(() => { 
      expect(stub.getCall(0)).to.be.calledWith('Debt Calculator has reached max amount of debts!')
    })
  })

  it('Get Window Alert from all 3 incorrect inputs', () => {
    cy.get('input[data-cy=principal]').type('NaN')
    cy.get('input[data-cy=interest]').type('NaN')
    cy.get('input[data-cy=loanMonths]').type('NaN')    

    const stub = cy.stub()
    cy.on("window:alert", stub)
    
    cy.get('button[data-cy=addDebt]').click().then(() => { 
      expect(stub.getCall(0)).to.be.calledWith('Inputs does not have correct format!')
    })

    cy.get('input[data-cy=principal]').type('{backspace}{backspace}{backspace}25')
    cy.get('input[data-cy=interest]').type('{backspace}{backspace}{backspace}150')  

    stub.reset()
    cy.get('button[data-cy=addDebt]').click().then(() => { 
      expect(stub.getCall(0)).to.be.calledWith('Inputs does not have correct format!')
    })
  })

  it('Get Window Alert from a negative number', () => {
    const stub = cy.stub()
    cy.on("window:alert", stub)

    cy.get('input[data-cy=principal]').type('-1')
    cy.get('input[data-cy=interest]').type('-1')
    cy.get('input[data-cy=loanMonths]').type('-1')
    cy.get('button[data-cy=addDebt]').click().then(() => { 
      expect(stub.getCall(0)).to.be.calledWith('Inputs must be greater than 0!')
    })

    stub.reset()
    cy.get('input[data-cy=interest]').type('{backspace}{backspace}0')
    cy.get('input[data-cy=loanMonths]').type('{backspace}{backspace}0')
    cy.get('button[data-cy=addDebt]').click().then(() => { 
      expect(stub.getCall(0)).to.be.calledWith('Inputs must be greater than 0!')
    })

    stub.reset()
    cy.get('input[data-cy=principal]').type('{backspace}{backspace}0')
    cy.get('input[data-cy=interest]').type('{backspace}-1')
    cy.get('button[data-cy=addDebt]').click().then(() => { 
      expect(stub.getCall(0)).to.be.calledWith('Inputs must be greater than 0!')
    })

    stub.reset()
    cy.get('input[data-cy=interest]').type('{backspace}{backspace}0')
    cy.get('input[data-cy=loanMonths]').type('{backspace}-1')
    cy.get('button[data-cy=addDebt]').click().then(() => { 
      expect(stub.getCall(0)).to.be.calledWith('Inputs must be greater than 0!')
    })
  })
})

describe('Integrate Input Form with Debt Calculator', () => {
  beforeEach(() => {
    cy.visit('/InvestmentCalculator')
    cy.get('button[name=advanced]').click()
    cy.get('form[data-cy=advancedForm]').within(($advancedForm) => {
      cy.get('label[data-cy=addDebtCalculator]').click()
    })
  })

  it('Test to see if 2 charts are displayed', () => {
    cy.get('input[name=hours]').type('15')
    cy.get('input[name=salary]').type('900')
    cy.get('select[name=salaryConversionRate]').select('Hour')
    cy.get('select[name=afterCalculationTime]').select('Biweek')
    cy.get('form[data-cy=debtCalculator]').within(($debtForm) => {
      cy.get('input[data-cy=principal]').type('25000')
      cy.get('input[data-cy=interest]').type('5.6')
      cy.get('input[data-cy=loanMonths]').type('24')
      cy.get('button[data-cy=addDebt]').click()
    })
    cy.get('button[name=compute]').click()

    cy.get('form[data-cy=afterCalculation]').should('exist')
    cy.get('div[data-cy=taxChart]').should('exist')
    cy.get('div[data-cy=debtChart]').should('exist')
  })
})
import { availableNetworks } from '../../src/configs/network'
import { NetworkId } from '../../src/types/network'

const addNewWalletButtonLabel = 'Add new wallet'
const confirmButtonLabel = 'Confirm'
const passwordSeletor = `input[name="password"]`
const showPrivateKeyButtonSelector = `[data-testid="show-private-key-btn"]`
const walletCardSelector = `[data-testid="wallet-card"]`
const networkDropdownSelector = `[data-testid="network-dropdown"]`
const password = 'myPassword'
describe('Visit the page for the first time', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('should see no wallet for the first time', () => {
    cy.contains('No wallet found').should('be.visible')
  })
  it('should add a new wallet with a valid password and see its balance', () => {
    cy.contains(addNewWalletButtonLabel).click()
    cy.get(passwordSeletor).type(password)
    cy.contains(confirmButtonLabel).click()
    cy.contains('Balance: 0.0').should('be.visible')
  })
  it('should add a new wallet after clearing an invalid password and inputting a correct one', () => {
    cy.contains(addNewWalletButtonLabel).click()
    const passwordInput = cy.get(passwordSeletor)
    passwordInput.type('    ')
    cy.contains(confirmButtonLabel).click()
    cy.contains('Password cannot be empty').should('be.visible')

    // clear the input
    passwordInput.clear().type(password)
    cy.contains(confirmButtonLabel).click()
    cy.contains('Balance: 0.0').should('be.visible')
  })
})

describe('Already generated wallets', () => {
  beforeEach(() => {
    cy.visit('/')
    // generate two wallets
    cy.contains(addNewWalletButtonLabel).click()
    cy.get(passwordSeletor).type(password)
    cy.contains(confirmButtonLabel).click()

    cy.contains(addNewWalletButtonLabel).click()
    cy.get(passwordSeletor).type(password)
    cy.contains(confirmButtonLabel).click()
  })
  it('should see the wallets after refreshing the page', () => {
    cy.reload()
    cy.get(walletCardSelector).should('have.length', 2)
  })

  it('should add a third wallet with a valid password', () => {
    cy.contains(addNewWalletButtonLabel).click()
    cy.get(passwordSeletor).type(password)
    cy.contains(confirmButtonLabel).click()
    cy.get(walletCardSelector).should('have.length', 3)
  })

  it("should view the private key of the wallet after clicking the 'View Private Key' button", () => {
    cy.get(showPrivateKeyButtonSelector).first().click()
    cy.get(passwordSeletor).type(password)
    cy.contains(confirmButtonLabel).click()
    cy.get('[data-testid="password-modal-private-key"]').should('be.visible')
  })
  it("should show the 'Invalid password' error message after inputting an invalid password", () => {
    cy.get(showPrivateKeyButtonSelector).first().click()
    cy.get(passwordSeletor).type('invalidPassword')
    cy.contains(confirmButtonLabel).click()
    cy.contains('Invalid password').should('be.visible')
  })
  it("should clear the 'Invalid password' error message after inputting a valid password", () => {
    cy.get(showPrivateKeyButtonSelector).first().click()
    cy.get(passwordSeletor).type('invalidPassword')
    cy.contains(confirmButtonLabel).click()
    cy.contains('Invalid password').should('be.visible')

    cy.get(passwordSeletor).clear().type(password)
    cy.contains(confirmButtonLabel).click()
    cy.contains('Invalid password').should('not.exist')
  })

  it('should switch to another network after clicking the network button', () => {
    const network = availableNetworks[NetworkId.BSC_TESTNET]
    cy.get(networkDropdownSelector).click()
    cy.contains(network.displayName).click()
    cy.contains(network.tokenSymbol).should('be.visible')
  })
})

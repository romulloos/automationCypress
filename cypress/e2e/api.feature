# cypress/e2e/login.feature
Feature: Login

  Scenario: Usuário tenta fazer login com credenciais válidas
    Given o usuário está na página de login
    When o usuário insere credenciais válidas
    Then o usuário deve ser redirecionado para a página inicial

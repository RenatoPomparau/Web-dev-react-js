// describe('blog app', function () {
//   beforeEach(function () {
//     cy.request('POST', 'http://localhost:3003/api/testing/reset')
//     cy.visit('http://localhost:5173')
//   })
//   it('Login form is shown', () => {
//     cy.get('.loginForm').should('be.visible')

//   })

//   describe('login test ', () => {
//     beforeEach(async function(){
//       const user = {
//         name: 'Renatopp',
//         username: 'Renatopp',
//         password: 'renatop2103'
//       }
//       const token=await cy.request('POST', 'http://localhost:3003/api/users',user)
//      // console.log(token.body)
//     })
//     it('successful login', () => {
//       cy.contains('login').click()
//       cy.get('#username').type('Renatopp')
//       cy.get('#password').type('renatop2103')
//       cy.get('#login-button').click()

//       cy.contains('Logged in as Renatopp')

//     })
//     it('unsuccessful login, wrong credentials', () => {
//       cy.contains('login').click()
//       cy.get('#username').type('Renatoppp')
//       cy.get('#password').type('renatop2103')
//       cy.get('#login-button').click()

//       cy.contains('Wrong credentials')

//     })
//     describe('When logged in', function () {
//       beforeEach(function () {
//         cy.get('#username').type('Renatopp')
//         cy.get('#password').type('renatop2103')
//         cy.get('#login-button').click()

//       })

//       it('A blog can be created', function () {
//         cy.contains('add blog').click()
//         cy.get('#input-author').type('test author')
//         cy.get('#input-url').type('test url')
//         cy.get('#input-title').type('test title')
//         cy.contains('Post').click()
//         cy.contains('test title')

//       })

//     })
//     describe('When logged in', function () {
//       beforeEach(function () {
// cy.get('#username').type('Renatopp')
// cy.get('#password').type('renatop2103')
// cy.get('#login-button').click()

//       })
//       it('A blog can be liked', function () {
//         cy.contains('add blog').click()
//         cy.get('#input-author').type('test author')
//         cy.get('#input-url').type('test url')
//         cy.get('#input-title').type('test title')
//         cy.contains('Post').click()
//         cy.contains('show').click()
//         cy.contains('like')
//         .click()
//         .get('#likeField')
//         .should('contain', '1')


//       })


//     })

//   })
// })

describe('Check the Remove Button', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    
  
    const user = {
      name: 'Renatopp',
      username: 'Renatopp',
      password: 'renatop2103'
    };
  
    cy.request('POST', 'http://localhost:3003/api/users', user)
      .then(() => {
        const loggeduser = {
          username: 'Renatopp',
          pass: 'renatop2103'
        };
  
        cy.request('POST', 'http://localhost:3003/api/login', loggeduser)
          .then(response => {
            cy.log(response.body)
            const token = `Bearer ${response.body.token}`;
            cy.request({
              url: 'http://localhost:3003/api/blogs',
              method: 'POST',
              body: {
                title: 'test title',
                url: 'test url',
                author: 'test author'
              },
              headers: { Authorization: token }
            }).then(response=>{
              cy.log(response)
            });
          });
      });
  
    // Login action after creating the user and blog

  });



  it('A blog can be deleted', function () {
    //Ensure that the blog post is visible and exists
    cy.visit('http://localhost:5173');
    cy.get('input:first').type('Renatopp');
    cy.get('#password').type('renatop2103');
    cy.get('#login-button').click();
    cy.contains('test title').should('be.visible')
    cy.contains('show').click()

    cy.contains('remove').click()


    cy.contains('test title').should('not.exist')
  })
})
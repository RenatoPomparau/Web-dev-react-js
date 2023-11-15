import '@testing-library/jest-dom'
import { render, screen,fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'
import Blog from './Blog'

test('test the show button', async()=>{
    const blog= {
        title : 'testing titile',
        author:'testing author',
        likes:0,
        url:'testing.url'
    }
    //const mockHandler= jest.fn()
    const user=userEvent.setup()

    const {container} = render(<Blog blog= {blog} ></Blog>)
    const button = screen.getByText('show')
    expect(button).toBeVisible();
    console.log(button.textContent)
    await user.click(button)

    let element = screen.queryByTestId('likeField');
    expect(element).not.toBeNull(); // Use toBeNull to check for absence
    
    element = screen.queryByTestId('urlField');
    expect(element).not.toBeNull(); // Use toBeNull to check for absence
          
})
test('render title and author but not url and likes by default', async()=>{
    const blog= {
        title : 'testing titile',
        author:'testing author',
        likes:0,
        url:'testing.url'
    }
     const {container} = render(<Blog blog= {blog}></Blog>)
     
    let element = screen.findByText('testing titile')
    expect(element).toBeDefined()
    element = screen.findByText('testing author')
    expect(element).toBeDefined()
    element = screen.queryByTestId('likeField');
    expect(element).toBeNull(); // Use toBeNull to check for absence
    
    element = screen.queryByText('testing.url');
    expect(element).toBeNull(); // Use toBeNull to check for absence
          
})
// test('Like button handler called twice on double click', async () => {
//     const mockHandleLikedButton = jest.fn();
  
// const mockBlog = {
//       title: 'Test Blog',
//       author: 'Test Author',
//       likes: 0,
//       url: 'https://example.com',
//     };
  

//     render(
//       <Blog blog={mockBlog} handleLikedButton={mockHandleLikedButton} />
//     )
//     const user= userEvent.setup()
//     const likeButton = await screen.findByText(/like/i);
//     console.log(likeButton)
//     // Simulate two clicks on the like button
//     await user.click(likeButton);
//     await user.click(likeButton);
  
//     // Check that the mock function was called twice
//     expect(mockHandleLikedButton.mock.calls).toHaveLength(2);
//   });
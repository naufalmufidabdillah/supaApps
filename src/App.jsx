import { useState, useEffect} from 'react'
import { createClient } from '@supabase/supabase-js'
import './App.css'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://unnqhvjejdzjhzckxtxe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVubnFodmplamR6amh6Y2t4dHhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NDE2NzAsImV4cCI6MjA2MzIxNzY3MH0.YDpR-B_WqioBtPJUiXt6MA0HBh6wl_Krdzh2dVqde_s')


function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    API()
  }, []);
  async function API (){
    const { data, error } = await supabase
      .from('product_with_category')
      .select()
    setProducts(data || [])
    // console.log(data)
  }
  function APImanual(){
    fetch("https://unnqhvjejdzjhzckxtxe.supabase.co/rest/v1/product_with_category", {
      method: 'GET',
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVubnFodmplamR6amh6Y2t4dHhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NDE2NzAsImV4cCI6MjA2MzIxNzY3MH0.YDpR-B_WqioBtPJUiXt6MA0HBh6wl_Krdzh2dVqde_s',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVubnFodmplamR6amh6Y2t4dHhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NDE2NzAsImV4cCI6MjA2MzIxNzY3MH0.YDpR-B_WqioBtPJUiXt6MA0HBh6wl_Krdzh2dVqde_s',
      }
    })
    .then(response => {
      return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error(error));

  }

  return (
    <div id="root">
    <h1>Product List</h1>
    <div className="table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>{item.product_name}</td>
              <td>{item.category_name}</td>
              <td>${item.price}</td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan="3" className="no-products">No products found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default App

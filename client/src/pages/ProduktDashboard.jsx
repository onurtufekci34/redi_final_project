import React, { useState, useEffect } from "react";

const ProduktDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        
        setProducts(data);
        
      } catch (error) {
        console.error("There was a problem fetching the data: ", error);
      }
    };

    fetchData();
  }, []);
  //console.log(products)

  const addProduct = async (event) => {
    event.preventDefault();
    

    if (
      newProduct.title &&
      newProduct.price &&
      newProduct.description &&
      newProduct.category &&
      newProduct.image
    ) {
      console.log(newProduct)

      const serverData = {
        product: newProduct
      };
      // Send a POST request to your API endpoint
      try {
        const response = await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(serverData),
        });

        if (response.ok) {
          // If the POST request is successful, update the state with the new product
          setProducts([...products, newProduct]);

          // Reset the form fields
          setNewProduct({
            title: "",
            price: 0,
            description: "",
            category: "",
            image: "",
          });
        } else {
          console.error("Failed to add product. Server returned an error.");
        }
      } catch (error) {
        console.error("Error sending POST request:", error);
      }
    }
  };

  const deleteProduct = async (productId) => {
    // Send a DELETE request to your API endpoint
    try {
      const response = await fetch(`/api/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // If the DELETE request is successful, update the state to reflect the deletion
        const updatedProducts = products.filter(
          (product) => product._id !== productId
        );
        setProducts(updatedProducts);
      } else {
        console.error("Failed to delete product. Server returned an error.");
      }
    } catch (error) {
      console.error("Error sending DELETE request:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
      setNewProduct((prevNewProduct) => ({
        ...prevNewProduct,
        [name]:name ==='price' ? parseFloat(value) : value,
      }));
    
  };




  return (
    <div className="container mt-4">
      <form onSubmit={addProduct}>
        <div className="col mb-2">
          <label htmlFor="title" className="form-label text-success">
            {" "}
            Title
          </label>
          <input
            id="title"
            className="form-control"
            type="text"
            name="title"
            placeholder="Title"
            value={ newProduct.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="col mb-2">
          <label htmlFor="price" className="form-label text-success">
            Price
          </label>
          <input
            id="price"
            className="form-control"
            type="number"
            name="price"
            placeholder="Price"
            value={ newProduct.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="col mb-2">
          <label htmlFor="description" className="form-label text-success">
            Description
          </label>
          <input
            id="description"
            className="form-control"
            type="text"
            name="description"
            placeholder="Description"
            value={
              newProduct.description
            }
            onChange={handleInputChange}
          />
        </div>
        <div className="col mb-2">
          <label htmlFor="category" className="form-label text-success">
            Category
          </label>
          <select
            id="category"
            className="form-select"
            name="category"
            value={
               newProduct.category
            }
            onChange={handleInputChange}
          >
            <option value="">Select Category</option>
            <option value="business">Business</option>
            <option value="gaming">Gaming</option>
          </select>
        </div>
        <div className="col mb-2">
          <label htmlFor="image" className="form-label text-success">
            Image
          </label>
          <input
            id="image"
            className="form-control"
            type="text"
            name="image"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={handleInputChange}
          />
        </div>
        <div className="col d-flex justify-content-center mt-3">
          <button className="btn btn-primary me-2" type="submit">
            Add Product
          </button>
          
        </div>
      </form>

      <div className="row mt-4">
        {products.map((product) => (
          <div key={product._id} className="col-lg-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="cardimage d-flex justify-content-center">
                  <img
                    src={product.image}
                    className="card-img-top w-50"
                    alt={product.description}
                  />
                </div>
                <h5 className="card-title text-truncate">{product.title}</h5>
                <p className="card-text text-truncate">{product.description}</p>
                <div className="d-flex justify-content-between">
                  <p className="card-text">{product.category}</p>
                  <p className="card-text fs-5 text-danger">{product.price}€</p>
                </div>

                <button
                  className="btn btn-danger me-2"
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </button>
               
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProduktDashboard;

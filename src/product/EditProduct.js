import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';

export default function EditProduct() {
    const navigate = useNavigate();

    const {id} = useParams()
    const [product, setProduct] = useState({
        description: "",
        name: "",
        price: 0,
        categoryId: ""
    });
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        // Fetch categories from backend when component mounts
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/categories/findall");
            setCategories(response.data); // Assuming response.data is an array of category objects
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const onInputChange = (e) => {
        if (e.target.name === "categoryId") {
        
            const selectedCategoryId = e.target.value;
            setProduct({ ...product, categoryId: selectedCategoryId });
        } else {
          
            setProduct({ ...product, [e.target.name]: e.target.value });
        }
    };

    useEffect(()=>{
        loadProduct()
    }, [])

    const loadProduct = async ()=>{
        const result=await axios.get(`http://localhost:8080/api/product/findby/${id}`)
        setProduct(result.data)
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/api/product/update/${id}`, product);
        navigate("/");
    };

  

    return (
        <Box sx={{ background: 'linear-gradient(#FEFDFF, #D6B1E3)', minHeight: '100vh', padding: '20px' }}>
        <form onSubmit={(e) => onSubmit(e)}>
            <div style={{ alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ marginBottom: '10px' }}>
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="description"
                        type="text"
                        value={product.description}
                        onChange={(e) => onInputChange(e)}
                        sx={{ width: '300px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="name"
                        type="text"
                        value={product.name}
                        onChange={(e) => onInputChange(e)}
                        sx={{ width: '300px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <TextField
                        label="Price"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="price"
                        type="number"
                        value={product.price}
                        onChange={(e) => onInputChange(e)}
                        sx={{ width: '300px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <TextField
                        select
                        label="Category"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="categoryId"
                        value={product.categoryId}
                        onChange={(e) => onInputChange(e)}
                        SelectProps={{
                            native: true,
                        }}
                        sx={{ width: '300px' }}
                    >
                        <option value=""></option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </TextField>
                </div>
                <div style={{ marginBottom: '10px' }} >
                    <Button type="submit" variant="contained" style={{ borderRadius: '5px', backgroundColor: 'blueviolet' }}>
                        Edit Product
                    </Button>
                    <Link to="/findall" style={{
                        display: 'inline-block',
                        marginLeft: '10px',
                        borderRadius: '5px',
                        backgroundColor: 'hotpink',
                        padding: '6px 16px',
                        fontSize: '17px',
                        textDecoration: 'none',
                        color: 'white',
                    }}>
                        Cancel
                    </Link>
                </div>
            </div>
        </form>
        </Box>
    );
};
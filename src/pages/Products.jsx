import { useEffect, useState } from "react";

import ProductList from "../components/ProductList";
import {
  getProducts,
  searchProducts,
  getCategories,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

const EMPTY_FORM = { title: "", price: "", description: "" };
const limit = 12;

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [mode, setMode] = useState("all"); // all | search | category
  const [form, setForm] = useState(EMPTY_FORM);

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await getCategories();

      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  }

  // GET general + paginación
  async function loadProducts(pageNumber = 1) {
    try {
      setLoading(true);
      setError("");

      const skip = (pageNumber - 1) * limit;

      const data = await getProducts(limit, skip);

      setProducts(data.products);
      setTotal(data.total);
      setPage(pageNumber);
      setMode("all");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function nextPage() {
    if (page < totalPages) {
      loadProducts(page + 1);
    }
  }

  function previousPage() {
    if (page > 1) {
      loadProducts(page - 1);
    }
  }

  // Búsqueda
  async function handleSearch(event) {
    event.preventDefault();

    setCategory("");

    if (search.trim() === "") {
      await loadProducts();
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await searchProducts(search);

      setProducts(data.products);
      setMode("search");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  // Filtro por categoría
  async function handleCategory(event) {
    const selectedCategory = event.target.value;

    setCategory(selectedCategory);
    setSearch("");

    if (selectedCategory === "") {
      await loadProducts();
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await getProductsByCategory(selectedCategory);

      setProducts(data.products);
      setMode("category");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  // Crear (POST)
  async function handleCreate(event) {
    event.preventDefault();

    try {
      setError("");

      const newProduct = await createProduct({
        ...form,
        price: Number(form.price),
      });

      // DummyJSON siempre responde con el mismo id, por eso se genera uno local
      setProducts([{ ...newProduct, id: Date.now(), local: true }, ...products]);

      setForm(EMPTY_FORM);
    } catch (error) {
      setError(error.message);
    }
  }

  // Preparar edición
  function handleEdit(product) {
    setEditingId(product.id);

    setForm({
      title: product.title,
      price: product.price,
      description: product.description ?? "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  // Actualizar (PUT)
  async function handleUpdate(event) {
    event.preventDefault();

    try {
      setError("");

      const data = { ...form, price: Number(form.price) };
      const target = products.find((product) => product.id === editingId);

      // Los productos creados localmente no existen en DummyJSON
      const updated = target?.local
        ? data
        : await updateProduct(editingId, data);

      setProducts(
        products.map((product) =>
          product.id === editingId ? { ...product, ...updated } : product
        )
      );

      cancelEdit();
    } catch (error) {
      setError(error.message);
    }
  }

  // Eliminar (DELETE)
  async function handleDelete(id) {
    try {
      setError("");

      const target = products.find((product) => product.id === id);

      if (!target?.local) {
        await deleteProduct(id);
      }

      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section>
      <h1>Productos</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <button type="submit">Buscar</button>
      </form>

      <select value={category} onChange={handleCategory}>
        <option value="">Todas las categorías</option>

        {categories.map((item) => {
          const value = item.slug ?? item;
          const label = item.name ?? item;

          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>

      <h2>{editingId ? "Editar producto" : "Agregar producto"}</h2>

      <form
        onSubmit={editingId ? handleUpdate : handleCreate}
        className="product-form"
      >
        <input
          type="text"
          name="title"
          placeholder="Nombre"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
          step="0.01"
          required
        />

        <textarea
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
        />

        <div className="form-actions">
          <button type="submit">{editingId ? "Actualizar" : "Guardar"}</button>

          {editingId && (
            <button type="button" onClick={cancelEdit}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      {loading && <p>Cargando productos...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && (
        <ProductList
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {mode === "all" && (
        <div className="pagination">
          <button onClick={previousPage} disabled={loading || page === 1}>
            Anterior
          </button>

          <span>Página {page}</span>

          <button onClick={nextPage} disabled={loading || page >= totalPages}>
            Siguiente
          </button>
        </div>
      )}
    </section>
  );
}

export default Products;

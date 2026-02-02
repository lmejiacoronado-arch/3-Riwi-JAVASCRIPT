import { projectService } from "../../services/services.js";

// --- VISTA ---
export function adminInventoryView() {
    return `
        <div class="admin-container">
            <header class="admin-header">
                <h1>Gestión de Inventario</h1>
                <p>Escribe libremente el nombre y la categoría de tus productos</p>
            </header>
            
            <form id="inventory-form" class="inventory-card">
                <input type="hidden" name="id" id="prod-id">
                
                <div class="form-row">
                    <div class="form-group">
                        <label>Nombre del Producto</label>
                        <input type="text" name="name" id="prod-name" required placeholder="Ej: Hamburguesa Doble">
                    </div>

                    <div class="form-group">
                        <label>Categoría</label>
                        <input type="text" name="category" id="prod-category" required placeholder="Ej: Especialidades">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Precio ($)</label>
                        <input type="number" name="price" id="prod-price" step="0.01" required>
                    </div>
                    <div class="form-group">
                        <label>URL Imagen</label>
                        <input type="text" name="img" id="prod-img" placeholder="URL de la imagen">
                    </div>
                </div>

                <div class="form-actions">
                    <button type="submit" id="btn-save" class="btn-primary">Guardar en Inventario</button>
                    <button type="button" id="btn-cancel" class="btn-secondary" style="display:none">Cancelar Edición</button>
                </div>
            </form>

            <div class="table-wrapper">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="inventory-target">
                        <tr><td colspan="4">Cargando datos...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// --- LÓGICA ---
export async function adminInventoryLogic() {
    const form = document.getElementById("inventory-form");
    const target = document.getElementById("inventory-target");
    const btnCancel = document.getElementById("btn-cancel");

    const renderTable = async () => {
        const products = await projectService.getMenu();
        target.innerHTML = products.map(p => `
            <tr>
                <td><strong>${p.name}</strong></td>
                <td><span class="category-text">${p.category}</span></td>
                <td>$${Number(p.price).toFixed(2)}</td>
                <td>
                    <button class="action-btn edit" data-id="${p.id}">Editar</button>
                    <button class="action-btn delete" data-id="${p.id}">Borrar</button>
                </td>
            </tr>
        `).join('');
    };

    // --- MANEJO CON FORMDATA ---
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Conversión y limpieza
        data.price = Number(data.price);
        const productId = data.id;
        delete data.id; 

        try {
            if (productId) {
                await projectService.updateProduct(productId, data);
            } else {
                await projectService.addProduct(data);
            }
            
            form.reset();
            document.getElementById("prod-id").value = "";
            btnCancel.style.display = "none";
            renderTable();
            alert("Inventario actualizado");
        } catch (error) {
            alert("Error al guardar producto");
        }
    });

    target.addEventListener('click', async (e) => {
        const id = e.target.dataset.id;
        if (!id) return;

        if (e.target.classList.contains('delete')) {
            if (confirm("¿Eliminar este producto permanentemente?")) {
                await projectService.deleteProduct(id);
                renderTable();
            }
        }

        if (e.target.classList.contains('edit')) {
            const products = await projectService.getMenu();
            const p = products.find(item => item.id == id);
            
            // Llenado de campos
            document.getElementById("prod-id").value = p.id;
            document.getElementById("prod-name").value = p.name;
            document.getElementById("prod-category").value = p.category;
            document.getElementById("prod-price").value = p.price;
            document.getElementById("prod-img").value = p.img || "";
            
            btnCancel.style.display = "inline-block";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    btnCancel.onclick = () => {
        form.reset();
        document.getElementById("prod-id").value = "";
        btnCancel.style.display = "none";
    };

    renderTable();
}
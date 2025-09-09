const form = document.getElementById('addForm')
const itemInput = document.getElementById('itemInput')
const qtyInput = document.getElementById('qtyInput')
const categorySelect = document.getElementById('categorySelect')
const listEl = document.getElementById('list')
const counterEl = document.getElementById('counter')

const shoppingList = []

function generateId() {
    return Math.floor(Math.random() * 900000) + 100000
}

form.addEventListener('submit', e => {
    e.preventDefault()

    const category = categorySelect.value
    const item = itemInput.value.trim()
    const quantity = parseInt(qtyInput.value)

    if (!category || !item || quantity <= 0) return


    const product = {
        id: generateId(),
        category: category,
        name: item,
        quantity: quantity,
        purchased: false
    }

    shoppingList.push(product)

    renderList()


    categorySelect.value = ""
    itemInput.value = ''
    qtyInput.value = 1
    itemInput.focus()
})

function renderList() {
    listEl.innerHTML = ''

    shoppingList.forEach(product => {
        const li = document.createElement('li')

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = product.purchased
        checkbox.addEventListener('change', () => {
            product.purchased = checkbox.checked
            renderList()
        })


        const span = document.createElement('span')
        span.textContent = `${product.category} - ${product.name} - Quantità: ${product.quantity}`
        if (product.purchased) {
            span.style.textDecoration = 'line-through'
            span.style.color = 'gray'
        }

        const removeBtn = document.createElement('button')
        removeBtn.textContent = 'Rimuovi'
        removeBtn.style.marginLeft = '10px'
        removeBtn.addEventListener('click', () => {
            removeProduct(product.id)
        })

        li.appendChild(checkbox)
        li.appendChild(span)
        li.appendChild(removeBtn)
        listEl.appendChild(li)
    })

    counterEl.textContent = `Totale elementi: ${shoppingList.length}`
}

function removeProduct(id) {
    const index = shoppingList.findIndex(p => p.id === id)
    if (index !== -1) {
        shoppingList.splice(index, 1)
        renderList()
    }
}

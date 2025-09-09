const form = document.getElementById('addForm')
const itemInput = document.getElementById('itemInput')
const qtyInput = document.getElementById('qtyInput')
const listEl = document.getElementById('list')


const shoppingList = []

function generateId() {
    return Math.floor(Math.random() * 900000) + 100000
}



form.addEventListener('submit', e => {
    e.preventDefault()

    const item = itemInput.value.trim()
    const quantity = parseInt(qtyInput.value)

    if (!item || quantity <= 0) return


    const product = {
        id: generateId(),
        name: item,
        quantity: quantity
    }

    shoppingList.push(product)

    renderList()

    itemInput.value = ''
    qtyInput.value = 1
    itemInput.focus()
})

function renderList() {
    listEl.innerHTML = ''

    shoppingList.forEach(product => {
        const li = document.createElement('li')
        li.textContent = `${product.name} - Quantità: ${product.quantity}`

        const removeBtn = document.createElement('button')
        removeBtn.textContent = 'Rimuovi'
        removeBtn.style.marginLeft = '10px'
        removeBtn.addEventListener('click', () => {
            removeProduct(product.id)
        })

        li.appendChild(removeBtn)
        listEl.appendChild(li)
    })
}

function removeProduct(id) {
    const index = shoppingList.findIndex(p => p.id === id)
    if (index !== -1) {
        shoppingList.splice(index, 1)
        renderList()
    }
}

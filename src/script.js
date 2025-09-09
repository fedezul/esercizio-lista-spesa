const form = document.getElementById('addForm')
const input = document.getElementById('itemInput')
const listEl = document.getElementById('list')

form.addEventListener('submit', e => {
    e.preventDefault()
    const text = input.value.trim()
    if (!text) return

    const li = document.createElement('li')
    li.textContent = text

    listEl.appendChild(li)
    input.value = ''
    input.focus()
})
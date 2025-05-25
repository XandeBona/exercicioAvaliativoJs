//Cria uma lista vazia para armazenar os contatos e ser usada pelo localStorage
let mainContactList = [];

//Função para adicionar os dados do contato na tabela
function addContactToTable(contactName, contactPhone1, contactPhone2) {
    //Cria novos elementos para a tabela, linhas e colunas
    const newLine = document.createElement('tr');
    const contactNameTable = document.createElement('td');
    const contactPhone1Table = document.createElement('td');
    const contactPhone2Table = document.createElement('td');

    //Cria checkbox na tabela (última coluna da linha)
    const checkboxTable = document.createElement('td');
    const checkboxTableInput = document.createElement('input');
    checkboxTableInput.setAttribute('type', 'checkbox');
    checkboxTableInput.setAttribute('class', 'checkbox_remove');

    //Preenche as colunas com os valores dos inputs
    contactNameTable.innerText = contactName;
    contactPhone1Table.innerText = contactPhone1;
    contactPhone2Table.innerText = contactPhone2;

    //Insere as colunas com na nova linha
    newLine.appendChild(contactNameTable);
    newLine.appendChild(contactPhone1Table);
    newLine.appendChild(contactPhone2Table);
    newLine.appendChild(checkboxTable);

    //Variável para adicionar os dados na tabela
    const contactList = document.getElementById("contact_table");

    //Utiliza a variável criada anteriormente para adicionar dados à nova linha da tabela
    contactList.appendChild(newLine);
    checkboxTable.appendChild(checkboxTableInput);

}


//Função para salvar os dados obtidos através dos inputs (nome, telefone 1 e 2)
function saveContact() {
    //Obtem os dados informados no input:
    const contactNameInput = document.getElementById("contact_name");
    const contactPhone1Input = document.getElementById("primary_phone");
    const contactPhone2Input = document.getElementById("secondary_phone");

    //Valida se os campos obrigatórios foram preenchidos
    if (!contactNameInput.value || !contactPhone1Input.value) {
        alert("Por favor, preencha todos os campos obrigatórios!");
        return;
    }

    //Regex para validar se o nome é valido (apenas letras e espaços, mínimo 2 caracteres)
    const nameRegex = /^[A-Za-zÀ-ÿ\s]{2,}$/;
    if (!nameRegex.test(contactNameInput.value)) {
        alert("O nome deve conter apenas letras e espaços");
        return;
    }

    //Regex para validar se o telefone está no formato: (XX) XXXXX-XXXX
    const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (!phoneRegex.test(contactPhone1Input.value) || (contactPhone2Input.value && !phoneRegex.test(contactPhone2Input.value))) {
        alert("Favor informar o telefone no formato (XX) XXXXX-XXXX");
        return;
    }

    //Cria um novo objeto com os valores de nome, telefone 1 e telefone 2
    const newContact = {
        contactName: contactNameInput.value,
        contactPhone1: contactPhone1Input.value,
        contactPhone2: contactPhone2Input.value
    }

    //Chama a funcao para adicionar os dados na tabela
    addContactToTable(newContact.contactName, newContact.contactPhone1, newContact.contactPhone2);

    //Salva o novo contato na lista principal e armazena no browser (localStorage)
    mainContactList.push(newContact);
    localStorage.setItem("contact_table", JSON.stringify(mainContactList));
}


//Função para carregar contatos que foram salvos anteriormente no localStorage ao abrir a página
function loadContacts() {
    const storage = JSON.parse(localStorage.getItem("contact_table"));
    mainContactList = storage ? storage : [];

    //Reinsere os contatos salvos anteriormente, na tabela
    for (let contact of mainContactList) {
        contactName = contact.contactName;
        contactPhone1 = contact.contactPhone1;
        contactPhone2 = contact.contactPhone2;
        addContactToTable(contactName, contactPhone1, contactPhone2);
    }

}

//Função para remover contatos selecionados com checkbox
function deleteContact() {
    //Obtem todas as linhas da tabela
    const table = document.getElementById("contact_table");
    const lines = table.getElementsByTagName("tr");

    //Nova lista para armazenar apenas os contatos que não foram marcados
    const newContactList = [];

    //Array temporário para armazenar as linhas que foram selecionadas para remoção
    const linesToRemove = [];

    //Percorre as linhas da tabela
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const checkbox = line.querySelector("input[type='checkbox']");

        //Se checkbox estiver marcado, salva o contato na lista de remoção
        if (checkbox && checkbox.checked) {
            linesToRemove.push(line);
        } else {
            //Se o checkbox não estiver marcado, salva o contato na lista dos contatos que não serão removidos
            const columns = line.getElementsByTagName("td");
            if (columns.length >= 3) {
                const contactName = columns[0].innerText;
                const contactPhone1 = columns[1].innerText;
                const contactPhone2 = columns[2].innerText;

                newContactList.push({ contactName, contactPhone1, contactPhone2 });
            }
        }
    }

    //Remove as linhas da tabela
    for (let line of linesToRemove) {
        table.removeChild(line);
    }

    //Atualiza a lista principal e o localStorage (info salva no browser)
    mainContactList = newContactList;
    localStorage.setItem("contact_table", JSON.stringify(mainContactList));
}

//Função para configurar os eventos dos botões ao carregar a página
function setupEventListeners() {
    //Chama a função para carregar os contatos salvos no localStorage
    loadContacts();

    //Botão salvar
    const saveButton = document.getElementById("contact_button");
    saveButton.addEventListener("click", saveContact);

    //Botão remover
    const deleteButton = document.getElementById("delete_button");
    deleteButton.addEventListener("click", deleteContact)
}

//Inicializa os eventos quando a página for carregada
window.addEventListener("load", setupEventListeners);
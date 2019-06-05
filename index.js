(function() {
    var firstNameBillingAddressEl = document.querySelector(".address-wrapper__billing [name='first-name']");
    var lastNameBillingAddressEl = document.querySelector(".address-wrapper__billing [name='last-name']");
    var addLine1BillingAddressEl = document.querySelector(".address-wrapper__billing [name='add-line-1']");
    var addLine2BillingAddressEl = document.querySelector(".address-wrapper__billing [name='add-line-2']");
    var cityBillingAddressEl = document.querySelector(".address-wrapper__billing [name='city']");
    var stateBillingAddressEl = document.querySelector(".address-wrapper__billing [name='state']");
    var zipcodeBillingAddressEl = document.querySelector(".address-wrapper__billing [name='zipcode']");
    var countryBillingAddressEl = document.querySelector(".address-wrapper__billing [name='country']");

    var firstNameShippingAddressEl = document.querySelector(".address-wrapper__shipping [name='first-name']");
    var lastNameShippingAddressEl = document.querySelector(".address-wrapper__shipping [name='last-name']");
    var addLine1ShippingAddressEl = document.querySelector(".address-wrapper__shipping [name='add-line-1']");
    var addLine2ShippingAddressEl = document.querySelector(".address-wrapper__shipping [name='add-line-2']");
    var cityShippingAddressEl = document.querySelector(".address-wrapper__shipping [name='city']");
    var stateShippingAddressEl = document.querySelector(".address-wrapper__shipping [name='state']");
    var zipcodeShippingAddressEl = document.querySelector(".address-wrapper__shipping [name='zipcode']");
    var countryShippingAddressEl = document.querySelector(".address-wrapper__shipping [name='country']");

    var productsListEl = document.querySelector('.all-products');

    var addProductRow = document.querySelector('.row__add-product');
    var addProductSelect = document.querySelector('.row__add-product .add-product');
    var addProductBtn = document.querySelector('.add-btn');

    function getProduct(pid) {
        return products.find(o => o.id === pid);
    }

    function updateAddProductList() {
        products.forEach(product => {
            if(!(order.products.find(p => p.pId === product.id))){
                var optionEl = document.createElement('option');
                optionEl.setAttribute('value', product.id);
                optionEl.innerHTML = product.name;

                addProductSelect.appendChild(optionEl);
            }
        });
    }

    function fillAddressInfo() {
        firstNameBillingAddressEl.value = order.billingAddress.firstName;
        lastNameBillingAddressEl.value = order.billingAddress.lastName;
        addLine1BillingAddressEl.value = order.billingAddress.addressLine1;
        addLine2BillingAddressEl.value = order.billingAddress.addressLine2;
        cityBillingAddressEl.value = order.billingAddress.city;
        stateBillingAddressEl.value = order.billingAddress.state;
        zipcodeBillingAddressEl.value = order.billingAddress.country;
        countryBillingAddressEl.value = order.billingAddress.zipcode;
        firstNameShippingAddressEl.value = order.shippingAddress.firstName;
        lastNameShippingAddressEl.value = order.shippingAddress.lastName;
        addLine1ShippingAddressEl.value = order.shippingAddress.addressLine1;
        addLine2ShippingAddressEl.value = order.shippingAddress.addressLine2;
        cityShippingAddressEl.value = order.shippingAddress.city;
        stateShippingAddressEl.value = order.shippingAddress.state;
        zipcodeShippingAddressEl.value = order.shippingAddress.country;
        countryShippingAddressEl.value = order.shippingAddress.zipcode;
    }

    function fillProductDetails() {
        order.products.forEach(prod => {
            addProductEl(prod.pId, prod.quantity, prod.notes);
        });
    }

    function addProductEl(pid, qty, notes) {
        var row = document.createElement("div");
        row.setAttribute("class", "row");

        var productIdEl = document.createElement("div");
        productIdEl.setAttribute("class", "product-id-wrapper");
        productIdEl.innerHTML = pid;
        row.appendChild(productIdEl);

        var productNameEl = document.createElement("div");
        productNameEl.setAttribute("class", "product-name-wrapper");
        productNameEl.innerHTML = getProduct(pid).name;
        row.appendChild(productNameEl);

        var qtyEl = document.createElement("div");
        qtyEl.setAttribute("class", "qty-wrapper");
        var qtyInputEl = document.createElement("input");
            qtyInputEl.setAttribute("value", qty);
            qtyInputEl.setAttribute("min", 1);
            qtyInputEl.setAttribute("type", "number");
        qtyEl.appendChild(qtyInputEl);
        row.appendChild(qtyEl);

        var unitPriceEl = document.createElement("div");
        unitPriceEl.setAttribute("class", "unit-price-wrapper");
        unitPriceEl.innerHTML = getProduct(pid).price;
        row.appendChild(unitPriceEl);

        var totalPriceEl = document.createElement("div");
        totalPriceEl.setAttribute("class", "total-price-wrapper");
        totalPriceEl.innerHTML = getProduct(pid).price * qty;
        row.appendChild(totalPriceEl);

        var notesEl = document.createElement("div");
        notesEl.setAttribute("class", "notes-wrapper");
        var notesInputEl = document.createElement("textarea");
        notesInputEl.value = notes;
        notesEl.appendChild(notesInputEl);
        row.appendChild(notesEl);

        var deleteEl = document.createElement("div");
        deleteEl.setAttribute("class", "delete-btn-wrapper");
        var btnEl = document.createElement("button");
        btnEl.setAttribute("class", 'delete-btn');
        btnEl.setAttribute("data-pid", pid);
        btnEl.innerHTML = 'Delete';
        deleteEl.appendChild(btnEl);
        row.appendChild(deleteEl);

        productsListEl.appendChild(row);
    }

    function fillOrderDetails() {
        fillAddressInfo();
        fillProductDetails();
    }

    function init() {
        fillOrderDetails();
        updateAddProductList();
    }

    init();
})();

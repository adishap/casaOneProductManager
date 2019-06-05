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
        if (order.products.length === products.length) {
            addProductRow.classList.add('hide');
        } else {
            addProductRow.classList.remove('hide');
            addProductSelect.innerHTML = '';
            products.forEach(product => {
                if(!(order.products.find(p => p.pId === product.id))){
                    var optionEl = document.createElement('option');
                    optionEl.setAttribute('value', product.id);
                    optionEl.innerHTML = product.name;
                    
                    addProductSelect.appendChild(optionEl);
                }
            });
        }
    }

    function validateOrder() {
        var validate = false;
        if (!order.products.length) {
            return {
                validate,
                error: "No products present in order",
            }
        }

        if (!(order.billingAddress.firstName && order.billingAddress.addressLine1 && order.billingAddress.city && order.billingAddress.state && order.billingAddress.country)) {
            return {
                validate,
                error: "Billing Address incomplete.",
            }
        }

        if (!(order.shippingAddress.firstName && order.shippingAddress.addressLine1 && order.shippingAddress.city && order.shippingAddress.state && order.shippingAddress.country)) {
            return {
                validate,
                error: "Shipping Address incomplete.",
            }
        }

        orderQuantityErr = false;
        order.products.forEach(prod => {
           if(prod.quantity <= 0) {
               orderQuantityErr = true;
           }
        });

        if (orderQuantityErr) {
            return {
                validate,
                error: "Please check product quatity before updating order",
            }
        }

        return {
            validate: true
        }
    }

    function addDatePicker() {
        $("#date__billing").datepicker();
        $("#date__billing").datepicker("setDate", order.orderDate);
        $("#date__billing").datepicker('option', 'onSelect', function() {
            order.orderDate = $(this).val();
            $("#date__shipping").datepicker('option','minDate', new Date(order.orderDate));
            if (order.orderDate > order.deliveryDate) {
                $("#date__shipping").datepicker('setDate', order.orderDate);
                order.deliveryDate = order.orderDate;
            }
        });
    
        $("#date__shipping").datepicker();
        $("#date__shipping").datepicker('setDate', order.deliveryDate);
        $("#date__shipping").datepicker('option','minDate', new Date(order.orderDate));
        $("#date__billing").datepicker('option', 'onSelect', function() {
            order.deliveryDate = $(this).val();
        });
    }

    function fillAddressInfo() {
        firstNameBillingAddressEl.value = order.billingAddress.firstName;
        lastNameBillingAddressEl.value = order.billingAddress.lastName;
        addLine1BillingAddressEl.value = order.billingAddress.addressLine1;
        addLine2BillingAddressEl.value = order.billingAddress.addressLine2;
        cityBillingAddressEl.value = order.billingAddress.city;
        stateBillingAddressEl.value = order.billingAddress.state;
        zipcodeBillingAddressEl.value = order.billingAddress.zipcode;
        countryBillingAddressEl.value = order.billingAddress.country;
        firstNameShippingAddressEl.value = order.shippingAddress.firstName;
        lastNameShippingAddressEl.value = order.shippingAddress.lastName;
        addLine1ShippingAddressEl.value = order.shippingAddress.addressLine1;
        addLine2ShippingAddressEl.value = order.shippingAddress.addressLine2;
        cityShippingAddressEl.value = order.shippingAddress.city;
        stateShippingAddressEl.value = order.shippingAddress.state;
        zipcodeShippingAddressEl.value = order.shippingAddress.zipcode;
        countryShippingAddressEl.value = order.shippingAddress.country;

        addDatePicker();
    }

    function fillProductDetails() {
        productsListEl.innerHTML = '';
        order.products.forEach(prod => {
            addProductEl(prod.pId, prod.quantity, prod.notes);
        });
    }

    function addProductEl(pid, qty, notes) {
        var row = document.createElement("div");
        row.setAttribute("class", "row");
        row.setAttribute("data-id", pid);

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

        deleteEl.addEventListener('click', (e) => {
            e.preventDefault();
            order.products = order.products.filter((p) => p.pId !== pid);
            updateAddProductList();
            fillProductDetails();
        });

        qtyInputEl.addEventListener('blur', () => {
            totalPriceEl.innerHTML = getProduct(pid).price * qtyInputEl.value;
            order.products = order.products.filter((p) => p.pId !== pid);
            order.products.push({
                pId: pid,
                quantity: qtyInputEl.value,
                notes: notes,
            });
        });

        notesInputEl.addEventListener('blur', () => {
            order.products = order.products.filter((p) => p.pId !== pid);
            order.products.push({
                pId: pid,
                quantity: qty,
                notes: notesInputEl.value,
            });
        });
    }

    function fillOrderDetails() {
        fillAddressInfo();
        fillProductDetails();
    }

    function init() {
        fillOrderDetails();
        updateAddProductList();
    }

    addProductBtn.addEventListener('click', (e) => {
        e.preventDefault();
        addProductEl(addProductSelect.value, 1, '');
        order.products.push({
            pId: addProductSelect.value,
            quantity: 1,
            notes: '',
        });
        updateAddProductList();
    });

    document.querySelectorAll('input').forEach(el => {
        el.addEventListener('blur', () => {
            order.billingAddress.firstName = firstNameBillingAddressEl.value;
            order.billingAddress.lastName = lastNameBillingAddressEl.value;
            order.billingAddress.addressLine1 = addLine1BillingAddressEl.value;
            order.billingAddress.addressLine2 = addLine2BillingAddressEl.value;
            order.billingAddress.city = cityBillingAddressEl.value;
            order.billingAddress.state = stateBillingAddressEl.value;
            order.billingAddress.zipcode = zipcodeBillingAddressEl.value;
            order.billingAddress.country = countryBillingAddressEl.value;

            order.shippingAddress.firstName = firstNameShippingAddressEl.value;
            order.shippingAddress.lastName = lastNameShippingAddressEl.value;
            order.shippingAddress.addressLine1 = addLine1ShippingAddressEl.value;
            order.shippingAddress.addressLine2 = addLine2ShippingAddressEl.value;
            order.shippingAddress.city = cityShippingAddressEl.value;
            order.shippingAddress.state = stateShippingAddressEl.value;
            order.shippingAddress.zipcode = zipcodeShippingAddressEl.value;
            order.shippingAddress.country = countryShippingAddressEl.value;
        });
    });

    document.querySelector('.save-btn').addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();

        if (validateOrder().validate) {
            document.querySelector('.error-messge').innerHTML = '';
            console.log('Order updated');
            console.log(order);
        } else {
            document.querySelector('.error-messge').innerHTML = validateOrder().error;
        }

    });

    init();
})();

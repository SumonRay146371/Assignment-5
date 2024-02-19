let clickedButtonsCount = 0;
const seatSerial = document.getElementById("seat-serial-section");
let selectedSeats = [];

seatSerial.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    const buttonText = e.target.innerText;

    if (selectedSeats.includes(buttonText)) {
      alert("This seat is already selected.");
      return;
    }

    if (clickedButtonsCount < 4) {
      bgColor(buttonText);
      clickedButtonsCount++;

      setTableData(buttonText);
      let value = getValue("seatPurchase");
      let total = value + 1;
      setValue("seatPurchase", total);

      let totalAvailable = getValue("available-seat");
      let seatAvailable = totalAvailable - 1;
      setValue("available-seat", seatAvailable);

      let totalPriceAmount = total * 550;
      setValue("totalPrice", totalPriceAmount);
      setValue("grandTotal", totalPriceAmount);

      selectedSeats.push(buttonText);

      if (clickedButtonsCount === 4) {
        const couponLabel = document.getElementById("couponInput");
        const couponBtn = document.getElementById("couponBtn");
        couponBtn.removeAttribute("disabled");
        couponLabel.removeAttribute("disabled");
      }
    } else {
      alert("You can only select up to 4 seats.");
    }
  }
});

// Coupon-Submit-function

couponBtn.addEventListener("click", () => {
  let couponBtn = document.getElementById("couponBtn");
  let couponInput = document.getElementById("couponInput");
  let couponLabel = document.getElementById("coupon-label");
  let discountMoney = document.getElementById("discountArea");
  let inputValue = couponInput.value;

  if (inputValue === "NEW15") {
    let totalPrice = getValue("totalPrice");
    let getDiscount = (totalPrice * 15) / 100;
    setValue("discountMoney", getDiscount);
    let offerPrice = totalPrice - (totalPrice * 15) / 100;
    couponLabel.classList.add("hidden");
    discountMoney.classList.remove("hidden");

    setValue("grandTotal", offerPrice);
  } else if (inputValue === "Couple 20") {
    let totalPrice = getValue("totalPrice");
    couponLabel.classList.add("hidden");
    let getDiscount = (totalPrice * 20) / 100;
    setValue("discountMoney", getDiscount);
    let offerPrice = totalPrice - (totalPrice * 20) / 100;

    discountMoney.classList.remove("hidden");
    setValue("grandTotal", offerPrice);
  } else {
    alert("Please Enter A Valid Coupon Code");
  }
});

// grandTotal

function buyTicket() {
  const seatSection = document.getElementById("buyTicket");
  seatSection.scrollIntoView({ behavior: "smooth" });
}

function modalHide() {
  location.reload();
}

function formSubmit(e) {
  e.preventDefault();

  let name = document.getElementById("name");
  let nameValue = name.value;

  let number = document.getElementById("PhoneNum");
  let numberValue = number.value;

  let email = document.getElementById("email");
  let emailValue = email.value;
  let value = getValue("seatPurchase");

  if (
    numberValue.length == 11 &&
    numberValue > 0 &&
    value > 0 &&
    nameValue !== "" &&
    emailValue !== ""
  ) {
    modal.showModal();
    let inputs = document.querySelectorAll("input");
    inputs.forEach(function (input) {
      input.value = "";
    });
  } else {
    alert(`Please fill all the required fields.`);
  }
}

function bgColor(id) {
  const element = document.getElementById(id);
  element.classList.add("bg-[#1dd100]");
}

function getValue(id) {
  const element = document.getElementById(id);
  const currentElementText = element.innerText;
  const value = parseInt(currentElementText);

  return value;
}

function setValue(id, value) {
  const element = document.getElementById(id);
  element.innerText = value;
}

function setTableData(seatNo) {
  const table = document.getElementById("ticketTable");
  let insertRow = document.createElement("tr");

  let firstSell = document.createElement("td");
  firstSell.textContent = seatNo;
  let secondSell = document.createElement("td");
  secondSell.textContent = "Economy";
  let thirdSell = document.createElement("td");
  thirdSell.textContent = "550";
  insertRow.appendChild(firstSell);
  insertRow.appendChild(secondSell);
  insertRow.appendChild(thirdSell);
  table.appendChild(insertRow);
}

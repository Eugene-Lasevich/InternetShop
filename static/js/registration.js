function calculateAgeAndDay() {
    const dobInput = document.getElementById("dob");
    const dob = new Date(dobInput.value);

    const currentDate = new Date();

    const age = currentDate.getFullYear() - dob.getFullYear();

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = daysOfWeek[dob.getDay()];

    const isAdult = age >= 18;

    const message = `You are ${age} years old and you were born on a ${dayOfWeek}.`;

    if (isAdult) {
        const resultElement = document.getElementById("result");
        resultElement.innerHTML = message;
    } else {
        // alert(message);
        alert("Подзовитие совершенолетних к монитору чтобы пользоваться этим сайтом");
    }
}

document.getElementById("myForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const formData = {
        name: document.querySelector("[name='name']").value,
        phone: document.querySelector("[name='phone']").value,
        service: document.querySelector("[name='service']").value,
        date: document.querySelector("[name='date']").value,
        message: document.querySelector("[name='message']").value
    };

    const res = await fetch("http://localhost:5000/api/forms/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    const data = await res.json();
    alert(data.message);

    document.getElementById("myForm").reset();
});
async function getAddresByCep() {
    const cep = document.getElementById("cep").value;
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        console.log(data);
        document.getElementById('rua').value = data.logradouro;
        document.getElementById('bairro').value = data.bairro;
        document.getElementById('cidade').value = data.localidade;
        console.log(response);
    } catch (error) {
        alert("Dados incompletos");
    }
}


async function getPrevisao() {
    const latInput = document.getElementById("lat");
    const longInput = document.getElementById("log");

    if (!latInput || !longInput) {
        alert("Campos de entrada não encontrados.");
        return;
    }

    const lat = latInput.value;
    const long = longInput.value;

    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`);

        if (!response.ok) {
            throw new Error('Erro ao carregar os dados da API.');
        }

        const data = await response.json();

        if (!data.hourly || !data.hourly.temperature_2m || data.hourly.temperature_2m.length === 0) {
            throw new Error('Dados de temperatura não encontrados.');
        }
        document.getElementById('temp').innerHTML = `Previsão do tempo de acordo com a região: ${data.hourly.temperature_2m[0]}º C`;

    } catch (error) {
        alert(error.message);
    }
}

const getPosition = position => {
    const dados = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    }

    console.log(dados)

    document.getElementById('lat').value = dados.latitude;
    document.getElementById('log').value = dados.longitude;
}

const geoError = error =>{
    console.log(Error)
}

navigator.geolocation.getCurrentPosition(getPosition, geoError)




function btn() {
    getAddresByCep();
    getPrevisao();
    
}























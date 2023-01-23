const Address = "https://beautiful-tan-frog.cyclic.app"


export async function register(email:string, password:string) {
    const url = `${Address}/api/auth/register`
    // console.log(email, password)
    
    const payload = {
        email: email,
        password: password,
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(payload),
        })
        const bearer = response.headers.get('bearer')
        const responseJson = await response.json()
        if (response.status === 200) {
            return { success: bearer }
        } else {
            return { error: responseJson.error }
        }
    } catch (error) {
        return { error: "An error occured. Try again later." }
    }
    
};


export async function login(email:string, password:string) {
    const url = `${Address}/api/auth/login`
    // console.log(email, password)
    
    const payload = {
        email: email,
        password: password,
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(payload),
        })
        const bearer = response.headers.get('bearer')
        const responseJson = await response.json()
        if (response.status === 200) {
            return { success: bearer }
        } else {
            return { error: responseJson.error }
        }
    } catch (error) {
        return { error: "An error occured. Try again later." }
    }
    
};

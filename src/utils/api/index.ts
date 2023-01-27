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

export async function verify(token:string) {
    const url = `${Address}/api/auth/verify`
    // console.log(email, password)
    
    const payload = {
        token: token
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

export async function forgot(email:string) {
    const url = `${Address}/api/auth/forgot`

    const payload = {
        email: email
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
        const responseJson = await response.json()
        return responseJson.message
    } catch (error) {
        return error
    }
};

export async function change(email:string, token: string) {
    const url = `${Address}/api/auth/change`

    const payload = {
        email: email,
        token: token,
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
        const responseJson = await response.json()
        if (response.status === 200) {
            return responseJson.success
        } else {
            // console.log(responseJson);
            
            return responseJson.error
        }
    } catch (error) {
        return "An error occured try again later"
    }
};

export async function getPreviousChats(token: string) {
    const url = `${Address}/api/user/chat`

    const payload = {
        token: token.toString(),
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
        const responseJson = await response.json()
        // console.log("responseJson: ", responseJson)
        if (response.status === 200) {
            return responseJson.chats
        } else {
            return { error: "An error occurred while generating the responses." }
        }
    } catch (error) {
        return { error: error }
    }
};

export async function generate(token: string, message: string) {
    const url = `${Address}/api/user/generate`

    const payload = {
        token: token,
        message: message,
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
        const responseJson = await response.json()
        // console.log("responseJson: ", responseJson)
        if (response.status === 200) {
            return responseJson.result
        } else {
            return { error: "An error occurred while generating the response" }
        }
    } catch (error) {
        return { error: "An error occured. Try again later." }
    }
};

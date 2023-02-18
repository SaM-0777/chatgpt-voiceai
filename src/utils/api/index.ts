const Address = "https://voiceai.cyclic.app/"


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


// from here

export async function getPreviousChats(token: string) {
    const url = `${Address}/api/user/chatV2`

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'authorization': 'Bearer ' + token,
            },
        })
        const responseJson = await response.json()
        // console.log("responseJson: ", responseJson)
        return responseJson
    } catch (error) {
        return { error: 1, message: "Something went wrong" }
    }
};

export async function generate(token: string, message: string) {
    const url = `${Address}/api/user/generateV2`

    const payload = {
        message: message,
    }

    try {
        const idToken = token
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                message: message
            }),
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'authorization': 'Bearer ' + idToken,
            },
        })
        const result = await response.json()
        return result
    } catch (error) {
        console.log("Request error: ", error)
        return { error: 1, message: "Something went wrong"}
    }
};

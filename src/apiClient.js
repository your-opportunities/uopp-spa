import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json"
    }
});

export const getOpportunities = (page, size, searchQuery, categories, formats, isAsap) => {
    return apiClient.get("/opportunities", {
        params: {
            page: page,
            size: size,
            searchQuery: searchQuery,
            categories: categories?.join(","),
            formats: formats?.join(","),
            isAsap: isAsap
        },
    })
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching opportunities:", error);
            return [];
        });
}

export const getOpportunityByUuid = (uuid) => {
    return apiClient.get("/opportunities/" + uuid)
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching opportunity by uuid:", error);
            return {};
        });
}

export const createSubscription = (subscriptionData) => {
    return apiClient.post("/subscriptions", subscriptionData)
        .then(response => response.data)
        .catch(error => {
            console.error("Error creating subscription:", error.response ? error.response.data : error);
            throw error;
        })}

export const signIn = (email, password) => {
    return apiClient.post("/moderator/sign-in", { email, password })
        .then(response => response.data)
        .catch(error => {
            console.error("Error during login:", error);
            throw error;
        });
}

export const setAuthToken = (token) => {
    if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete apiClient.defaults.headers.common['Authorization'];
    }
}

export const getModeratorOpportunities = (page, size, token) => {
    if (token) {
        setAuthToken(token);
    }

    return apiClient.get("/moderator/opportunities", {
        params: {
            page,
            size
        }
    })
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching moderator opportunities:", error);
            return [];
        });
}

export const updateOpportunityStatus = (uuid, status) => {
    return apiClient.post("/moderator/approve", { uuid, opportunityStatus: status })
        .then(response => response.data)
        .catch(error => {
            console.error("Error updating opportunity status:", error);
            throw error;
        });
}

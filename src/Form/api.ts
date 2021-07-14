import { dummyRequest, OrderDetailsForEditor } from './helpers';

class Api {
    public static async fetchCustomers() {
        return new Promise<string[]>((resolve => {
            setTimeout(() => resolve([
                'LCustomer one',
                'LCustomer two',
                'LCustomer three'
            ]), 3000);
        }));
    }

    public static async fetchDepartments(customer: string | null) {
        return new Promise<string[]>((resolve, reject) => {
            reject('error');
            // setTimeout(() => resolve([
            //     `${ customer } Dept1`,
            //     `${ customer } Dept2`,
            //     `${ customer } Dept3`
            // ]), 2500);
        });
    }

    public static async fetchLocations(customer: string | null) {
        return new Promise<string[]>((resolve => {
            setTimeout(() => resolve([
                `${customer} Loc1`,
                `${customer} Loc2`,
                `${customer} Loc3`
            ]), 2500);
        }));
    }

    public static async fetchOrder() {
        return new Promise<OrderDetailsForEditor>((resolve => {
            setTimeout(() => resolve(dummyRequest), 1500);
        }))
    }
}

export default Api;

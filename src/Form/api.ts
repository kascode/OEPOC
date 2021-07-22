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
            // reject('error');
            setTimeout(() => resolve([
                `${ customer } Dept1`,
                `${ customer } Dept2`,
                `${ customer } Dept3`
            ]), 2500);
        });
    }

    public static async fetchLocations(customer: string | null) {
        console.log('fetch locations');
        return new Promise<string[]>((resolve => {
            setTimeout(() => resolve([
                `${customer} Loc1`
            ]), 2500);
        }));
    }

    public static async fetchOrder() {
        console.log('fetch order');

        return new Promise<OrderDetailsForEditor>((resolve => {
            setTimeout(() => resolve(dummyRequest), 1500);
        }))
    }

    public static async sendOrder(order: OrderDetailsForEditor): Promise<boolean> {
        return new Promise(resolve => {
            setTimeout(() => resolve(true), 1500);
        });
    }
}

export default Api;

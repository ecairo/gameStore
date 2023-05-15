import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { cold } from "jasmine-marbles";
import { map } from "rxjs";

describe('Playground tests', () => {

    // it('should set message to promise result', () => {
    //     const messageContent = 'Unread messages (2)';
    //     let message = '';

    //     Promise.resolve().then(() => {
    //         message = messageContent;
    //     });

    //     expect(message).toBe(messageContent);
    // });


    it('should set message to promise result', fakeAsync(() => {
        const messageContent = 'Unread messages (2)';
        let message = '';

        Promise.resolve().then(() => {
            message = messageContent;
        });

        flush();

        expect(message).toBe(messageContent);
    }));

    it('should set message to promise result', fakeAsync(() => {
        const messageContent = 'Unread messages ';
        let message = '';

        setTimeout(() => {
            console.log('From timeout 1');
            message = messageContent + '(3)';            
        }, 2000);

        setTimeout(() => {
            console.log('From timeout 2');
            message = messageContent + '(6)';
        }, 3000);

        Promise.resolve().then(() => {
            console.log('From promise');
            message = messageContent + '(2)';
        });

        // flush();
        // tick(1000);
        flushMicrotasks();
        expect(message).toBe(messageContent + '(2)');

        tick(2000);
        expect(message).toBe(messageContent + '(3)');

        tick(3000);
        expect(message).toBe(messageContent + '(6)');
    }));


    it('should power of "2" each value emitted', () => {
        // Assert
        const values = { 
            a: 1, b: 2, c: 3,
            x: 1, y: 4, z: 9 
        };
        const source = cold('-a--b-c-|', values);
        const expected = cold('-x--y-z-|', values);

        // 
        const result = source.pipe(map(x => x * x));

        expect(result).toBeObservable(expected);
    });
})


/*

        Tasks      |  Main
-------------------|--------
   micro |   macro |
-------------------|
Promise  | TimeOut |


*/
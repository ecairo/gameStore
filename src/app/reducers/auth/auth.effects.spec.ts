import createSpyObj = jasmine.createSpyObj;
import {Observable} from "rxjs";
import SpyObj = jasmine.SpyObj;
import {AuthService} from "../../user/auth.service";
import {AuthEffects} from "./auth.effects";
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {provideMockStore} from "@ngrx/store/testing";
import {provideMockActions} from "@ngrx/effects/testing";
import {cold, hot} from "jasmine-marbles";
import {AuthActions} from "./auth.actions";
import {TestHotObservable} from "jasmine-marbles/src/test-observables";
import {TypedAction} from "@ngrx/store/src/models";

describe('ExpeditionLanes Effects', () => {
    let actions$: Observable<any>;
    let effects: AuthEffects;
    const repository: SpyObj<AuthService> = createSpyObj('authService', [
      'loginUser'
    ]);


    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          provideMockStore({}),
          provideMockActions(() => actions$),
          AuthEffects,
          {provide: AuthService, useValue: repository}
        ]
      });
      effects = TestBed.inject(AuthEffects);
    })


  it('should call repository loginUser and dispatch loginSuccess when login is dispatched', () => {
    //Arrange
    repository.loginUser.and.returnValue(cold('-a|', {a: { body: { token: 'token' } }}));
    const action: TypedAction<any> = AuthActions.login({username: 'test', password: 'test'});
    const completion: TypedAction<any> = AuthActions.loginSuccess({ user: { UserName: 'test', Token: 'token'}})

    //Act
    actions$ = hot('-a', {a: action});
    const expected: TestHotObservable = hot('--b', {b: completion});

    //Assert
    expect(effects.loginEffect$).toBeObservable(expected);
  });

    it('should call repository loginUser and dispatch loginFailure when login is dispatched', () => {
      //Arrange
      repository.loginUser.and.returnValue(cold('-a-', { a: {body: {}} }));
      const action: TypedAction<any> = AuthActions.login({username: 'test', password: 'test'});
      const completion: TypedAction<any> = AuthActions.loginFailure({ error: new Error('No user found')});

      //Act
      actions$ = hot('-a-', {a: action});
      const expected: TestHotObservable = hot('--(b|)', { b: completion});

      //Assert
      expect(effects.loginEffect$).toBeObservable(expected);
    })
}
)

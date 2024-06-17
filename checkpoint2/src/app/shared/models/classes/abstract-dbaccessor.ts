import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

export abstract class AbstractDBAccessor<T> {
    private path!: string;
    private httpService = inject(HttpClient);

    constructor(path: string){
        this.path = path;
    }

    getAll$(): Observable<T[]>{
        return this.httpService.get<T[]>(`${environment.servers.backend}/${this.path}/get/all`);
    }
    
    getById$(id: number): Observable<T>{
        return this.httpService.get<T>(`${environment.servers.backend}/${this.path}/get/${id}`);
    }

    add$(newEntity: T): Observable<T>{
        return this.httpService.post<T>(
            `${environment.servers.backend}/${this.path}/add`,
            newEntity
        );
    }

    update$(updateEntity: T, id: number): Observable<T>{
        return this.httpService.put<T>(
            `${environment.servers.backend}/${this.path}/add/${id}`,
            updateEntity
        );
    }

    delete(id: number): void{
        this.httpService.delete<T>(`${environment.servers.backend}/${this.path}/delete/${id}`);
    }

}

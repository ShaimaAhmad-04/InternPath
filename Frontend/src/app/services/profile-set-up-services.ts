import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileSetUPServices {
  constructor(private _http: HttpClient) { }

  uploadCv(file: File) {
    const formData = new FormData();
    formData.append('file', file); // 'file' must match the FastAPI parameter name

    return this._http.post('http://localhost:8000/upload-cv', formData);
  }
  // in your profile-setup.service.ts or similar
  updateProfile(profileData: any): Observable<any> {
    // Assuming your auth middleware handles the token/userId
    return this._http.put('http://localhost:5002/student/profile', profileData);
  }
}

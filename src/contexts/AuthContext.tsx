import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const STORAGE_KEY = 'jstar-user';

function getApiUrl() {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
    return `${baseUrl}/api/auth`;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children } : { children : ReactNode }) {
    const [user , setUser] = useState<User | null>(null);

    // Check for existing session on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if(stored){
            try{
                const parsedUser=JSON.parse(stored);
                setUser(parsedUser);
            }
            catch{
                localStorage.removeItem(STORAGE_KEY);
            }
        }
    }, []);

    const login=async(email:string ,password:string):Promise <{success :boolean ;error ?:string}>=>{
        try{
            const authApiUrl = getApiUrl();
            
            console.log('Login to:', `${authApiUrl}/login`);
            
            const response=await fetch(`${authApiUrl}/login`,{
                method:'POST',
                headers:{ 
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({email: email, password: password})
            });
            
             if(!response.ok){
                 let errorMessage='Login failed';
                 try{
                     const errData=await response.json();
                     errorMessage=errData.error||'Login failed';
                     
                     if(errorMessage==='Invalid email or password'){ 
                         return{success :false ,error:'No account found with this email address.'};
                     }
                     
                 }
                 catch{}
                
               return {success :false ,error: errorMessage};   
             }

             const data=await response.json();
             
             if(data.success &&data.user){
                  setUser({
                       email   :data.user.email,
                       name   :data.user.name 
                  });
                  localStorage.setItem(STORAGE_KEY ,
                   JSON.stringify({email   :data.user.email,name   :data.user.name}));
                    
                   return{success:true};
              }

           throw new Error('Unexpected response format');
           
       }catch(err){    
          console.error('Login request failed:',err);       
          return{success: false, error: 'Connection failed'};     
      };
      
     };

     function logout():void{
         setUser(null);
         localStorage.removeItem(STORAGE_KEY);
     }
     
     return(
        <AuthContext.Provider value={{
            user: user,
            isLoggedIn: !!user,
            login: login,
            logout: logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    const context = useContext(AuthContext);
    if(context === undefined){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

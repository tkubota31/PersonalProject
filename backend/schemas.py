from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Token Schema
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Tournament Schemas
class TournamentBase(BaseModel):
    name: str
    description: Optional[str] = None
    location: str
    start_date: datetime
    end_date: datetime
    max_teams: int
    registration_deadline: datetime
    fee: float = 0

class TournamentCreate(TournamentBase):
    pass

class TournamentUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    max_teams: Optional[int] = None
    registration_deadline: Optional[datetime] = None
    fee: Optional[float] = None

class TournamentResponse(TournamentBase):
    id: int
    created_at: datetime
    created_by: int
    registrations: List["RegistrationResponse"] = []

    class Config:
        from_attributes = True

# Registration Schemas
class RegistrationBase(BaseModel):
    team_name: str

class RegistrationCreate(RegistrationBase):
    tournament_id: int

class RegistrationResponse(BaseModel):
    id: int
    user_id: int
    tournament_id: int
    team_name: str
    status: str
    registered_at: datetime

    class Config:
        from_attributes = True

class RegistrationWithUser(RegistrationResponse):
    user: UserResponse

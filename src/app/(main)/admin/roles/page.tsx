"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, UserCog } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const allUsers = [
  { id: 1, name: "김민준", email: "mj.kim@paywise.ai", roles: ["payroll", "admin"], avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
  { id: 2, name: "이서연", email: "sy.lee@paywise.ai", roles: ["executive"], avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e" },
  { id: 3, name: "박도윤", email: "dy.park@paywise.ai", roles: ["auditor"], avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f" },
  { id: 4, name: "최지우", email: "jw.choi@paywise.ai", roles: ["payroll"], avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704a" },
];

const allRoles = ["payroll", "executive", "auditor", "admin"];

export default function RolesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = useMemo(() => {
    return allUsers.filter(user =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
                <UserCog className="h-7 w-7"/>
                권한/역할 관리
            </h1>
            <p className="text-muted-foreground">사용자별 시스템 접근 권한을 관리합니다.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>사용자 역할 관리</CardTitle>
          <CardDescription>
            이메일 또는 이름으로 사용자를 검색하고 역할을 부여하세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="사용자 이메일 또는 이름 검색..." 
                    className="pl-10" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
          </div>
          <div className="border rounded-md">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>사용자</TableHead>
                    {allRoles.map(role => <TableHead key={role} className="text-center capitalize">{role}</TableHead>)}
                    <TableHead className="text-right">저장</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                    <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div>{user.name}</div>
                                <div className="text-xs text-muted-foreground">{user.email}</div>
                            </div>
                        </div>
                    </TableCell>
                    {allRoles.map(role => (
                        <TableCell key={role} className="text-center">
                            <Checkbox defaultChecked={user.roles.includes(role)} />
                        </TableCell>
                    ))}
                    <TableCell className="text-right">
                        <Button variant="ghost" size="sm">저장</Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

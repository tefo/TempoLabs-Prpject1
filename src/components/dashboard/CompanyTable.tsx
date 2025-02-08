import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Company {
  id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: string;
}

interface CompanyTableProps {
  companies?: Company[];
  onEdit?: (company: Company) => void;
  onDelete?: (company: Company) => void;
  onSort?: (column: keyof Company) => void;
}

const defaultCompanies: Company[] = [
  {
    id: "1",
    name: "Acme Corporation",
    email: "contact@acme.com",
    phone: "+1 (555) 123-4567",
    website: "www.acme.com",
    address: "123 Business Ave, Suite 100, New York, NY 10001",
  },
  {
    id: "2",
    name: "Globex Corporation",
    email: "info@globex.com",
    phone: "+1 (555) 987-6543",
    website: "www.globex.com",
    address: "456 Enterprise St, Chicago, IL 60601",
  },
  {
    id: "3",
    name: "Soylent Corp",
    email: "hello@soylent.com",
    phone: "+1 (555) 246-8135",
    website: "www.soylent.com",
    address: "789 Innovation Dr, San Francisco, CA 94105",
  },
];

export default function CompanyTable({
  companies = defaultCompanies,
  onEdit = () => {},
  onDelete = () => {},
  onSort = () => {},
}: CompanyTableProps) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Companies</CardTitle>
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button>Add Company</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => onSort("name")}
                    className="flex items-center gap-1"
                  >
                    Name
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => onSort("email")}
                    className="flex items-center gap-1"
                  >
                    Email
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Address</TableHead>
                <TableHead className="w-[50px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>{company.email}</TableCell>
                  <TableCell>{company.phone}</TableCell>
                  <TableCell>
                    <a
                      href={`https://${company.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {company.website}
                    </a>
                  </TableCell>
                  <TableCell>{company.address}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(company)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDelete(company)}
                          className="text-red-600"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

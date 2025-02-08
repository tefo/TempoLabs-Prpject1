import { supabase } from "./supabase";
import { Tables } from "@/types/supabase";

// Companies
export async function getCompanies() {
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .order("name");
  if (error) throw error;
  return data;
}

export async function createCompany(
  company: Omit<Tables<"companies">, "id" | "created_at" | "updated_at">,
) {
  const { data, error } = await supabase
    .from("companies")
    .insert(company)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateCompany(
  id: string,
  company: Partial<Tables<"companies">>,
) {
  const { data, error } = await supabase
    .from("companies")
    .update(company)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteCompany(id: string) {
  const { error } = await supabase.from("companies").delete().eq("id", id);
  if (error) throw error;
}

// Contacts
export async function getContacts() {
  const { data, error } = await supabase
    .from("contacts")
    .select("*, companies(name)")
    .order("first_name");
  if (error) throw error;
  return data;
}

export async function createContact(
  contact: Omit<Tables<"contacts">, "id" | "created_at" | "updated_at">,
) {
  const { data, error } = await supabase
    .from("contacts")
    .insert(contact)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateContact(
  id: string,
  contact: Partial<Tables<"contacts">>,
) {
  const { data, error } = await supabase
    .from("contacts")
    .update(contact)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteContact(id: string) {
  const { error } = await supabase.from("contacts").delete().eq("id", id);
  if (error) throw error;
}

// Tasks
export async function getTasks() {
  const { data, error } = await supabase
    .from("tasks")
    .select("*, contacts(first_name, last_name)")
    .order("due_date");
  if (error) throw error;
  return data;
}

export async function createTask(
  task: Omit<Tables<"tasks">, "id" | "created_at" | "updated_at">,
) {
  const { data, error } = await supabase
    .from("tasks")
    .insert(task)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateTask(id: string, task: Partial<Tables<"tasks">>) {
  const { data, error } = await supabase
    .from("tasks")
    .update(task)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteTask(id: string) {
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) throw error;
}

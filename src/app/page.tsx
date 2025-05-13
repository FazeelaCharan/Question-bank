"use client";
import React from "react";
import "./globals.css";

import { useState } from "react";
import { Button } from "../app/components/ui/button";
import { Plus } from "lucide-react";
import { QuestionFormSheet } from "../app/components/QuestionComponents/QuestionFormSheet";
import { QuestionTable } from "../app/components/QuestionComponents/QuestionTable";
import Question from "../lib/types";

export default function QuestionsPage() {
  const [open, setOpen] = useState(false);
  const [initialData, setInitialData] = useState<Question | null>(null);

  const handleCreate = () => {
    setInitialData(null);
    setOpen(true);
  };

  const handleEdit = (question: Question) => {
    setInitialData(question);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInitialData(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Question Bank</h1>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Create Question
        </Button>
      </div>

      <QuestionTable onEdit={handleEdit} />

      <QuestionFormSheet
        open={open}
        onClose={handleClose}
        initialData={initialData}
      />
    </div>
  );
}

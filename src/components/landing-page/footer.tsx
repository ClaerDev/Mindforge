"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const Footer = () => {
  const [openDialog, setOpenDialog] = useState<"terms" | "privacy" | null>(
    null
  );

  const closeDialog = () => setOpenDialog(null);

  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-900 py-6 border-t border-gray-300 dark:border-gray-700">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-4">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          &copy; {new Date().getFullYear()} MindForge Inc. All rights reserved.
        </p>
        <div className="flex gap-6">
          <button
            className="text-sm text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition-colors"
            onClick={() => setOpenDialog("terms")}
          >
            Terms of Service
          </button>
          <button
            className="text-sm text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition-colors"
            onClick={() => setOpenDialog("privacy")}
          >
            Privacy Policy
          </button>
        </div>
      </div>

      <Dialog
        open={openDialog !== null}
        onOpenChange={(val) => !val && closeDialog()}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {openDialog === "terms"
                ? "MindForge Terms of Service"
                : "MindForge Privacy Policy"}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="mt-2 text-gray-700 dark:text-gray-300 text-sm space-y-2">
            {openDialog === "terms" ? (
              <>
                <p>
                  Welcome to MindForge! By using our AI image generator and
                  model training platform, you agree to comply with our Terms of
                  Service.
                </p>
                <p>
                  You are responsible for your content, and all generated models
                  and images must follow legal and ethical guidelines.
                </p>
                <p>
                  MindForge Inc. reserves the right to suspend or terminate
                  accounts violating our terms.
                </p>
              </>
            ) : (
              <>
                <p>
                  At MindForge, your privacy is our priority. We collect minimal
                  data required to provide AI services and improve your
                  experience.
                </p>
                <p>
                  We never sell your data. Generated images and models belong to
                  you. We may use anonymized data to improve AI models.
                </p>
                <p>By using MindForge, you consent to our privacy practices.</p>
              </>
            )}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Sparkle } from 'lucide-react';
import { Button } from '@/components/ui/button';

function NewCourseDialogBox({ children }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    includeVideo: false,
    noOfChapters: 0,
    category: '',
    level: ''
  });

  const onHandleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    console.log({ ...formData, [field]: value }); 
  };
  const onGenerate =()=>{
    console.log(formData);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Course Using AI</DialogTitle>
          <DialogDescription asChild>
            <div className='flex flex-col gap-4 mt-3'>
              <div>
                <label>Course</label>
                <Input
                  placeholder="Course Name"
                  onChange={(e) => onHandleInputChange('name', e.target.value)}
                />
              </div>
              <div>
                <label>Course Description (Optional)</label>
                <Textarea
                  placeholder="Course Description"
                  onChange={(e) => onHandleInputChange('description', e.target.value)}
                />
              </div>
              <div>
                <label>No. of Chapters</label>
                <Input
                  placeholder="No. of Chapters"
                  type="number"
                  onChange={(e) => onHandleInputChange('noOfChapters', parseInt(e.target.value || 0))}
                />
              </div>
              <div className='flex gap-3 items-center'>
                <label>Include Video</label>
                <Switch
                  checked={formData.includeVideo}
                  onCheckedChange={(checked) => onHandleInputChange('includeVideo', checked)}
                />
              </div>
              <div>
                <label className=''>Difficulty Level</label>
                <Select onValueChange={(value) => onHandleInputChange('level', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Difficulty Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label>Category</label>
                <Input
                  placeholder="Category (Separated by comma)"
                  onChange={(e) => onHandleInputChange('category', e.target.value)}
                />
              </div>
              <div className='mt-5'>
                <Button className='w-full' onClick={onGenerate}>
                  <Sparkle className="mr-2 h-4 w-4" />
                  Generate Course
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default NewCourseDialogBox;

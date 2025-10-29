import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Label } from '../ui/Label';
import { Shield, Edit2, Save, X } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

const CreditLimit = ({ currentLimit, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newLimit, setNewLimit] = useState(currentLimit.toString());

  const handleSave = () => {
    const limit = parseFloat(newLimit);
    if (limit > 0) {
      onUpdate(limit);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setNewLimit(currentLimit.toString());
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Credit Limit
          </span>
          {!isEditing && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="w-4 h-4" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="creditLimit">New Credit Limit</Label>
              <Input
                id="creditLimit"
                type="number"
                step="100"
                value={newLimit}
                onChange={(e) => setNewLimit(e.target.value)}
                className="text-lg"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                className="flex-1"
              >
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
              <Button
                variant="gradient"
                size="sm"
                onClick={handleSave}
                className="flex-1"
              >
                <Save className="w-4 h-4 mr-1" />
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">
              {formatCurrency(currentLimit)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Maximum credit allowed
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CreditLimit;